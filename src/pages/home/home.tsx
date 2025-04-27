import React, { useState } from "react";
import HomeScreenForm from "../../components/modules/home/home-screen-form";
import HomePost from "../../components/modules/home/home-post";
import { useGetDb } from "../../hooks/useDb";
import { PiSignOutBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { useListPosts } from "../../api/queries/posts.query";
import { Pagination } from "../../components/shared";

const Home = () => {
  const { data: users, error, clearStore } = useGetDb("users");
  const username = users.length > 0 ? users[0].username : null;
  const navigate = useNavigate();
  const [currentUrl, setCurrentUrl] = useState<string | undefined>(undefined);
  const { data, refetch, isLoading } = useListPosts(currentUrl);

  React.useEffect(() => {
    if (!username) {
      navigate("/login");
    }
  }, [username, navigate]);

  if (error) {
    return <p>Error: {error}</p>;
  }

  const handlePageChange = (url: string | null) => {
    if (!url) return;
    setCurrentUrl(url);
  };

  const limit = (() => {
    const url = data?.next || data?.previous;
    if (!url) return 10;
    return parseInt(new URL(url).searchParams.get("limit") || "10");
  })();

  const handleLogout = () => {
    clearStore();
    navigate("/login");
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="bg-white relative w-full md:w-[800px] h-full overflow-y-auto">
        <div className="bg-primary w-full flex items-center justify-between px-5 h-[80px] py-10">
          <h1 className="font-[700] text-white text-[1.37rem]">
            CodeLeap Network
          </h1>
          <div className="flex items-center gap-5 text-white text-[1.12rem]">
            <span>{username}</span>
            <PiSignOutBold className="cursor-pointer" onClick={handleLogout} />
          </div>
        </div>
        <div className="px-5 py-10">
          <HomeScreenForm username={username} onReload={refetch} />
          <HomePost
            posts={data?.results}
            username={username}
            isLoading={isLoading}
          />
          <Pagination
            count={data?.count || 0}
            next={data?.next}
            previous={data?.previous}
            onPageChange={handlePageChange}
            limit={limit}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
