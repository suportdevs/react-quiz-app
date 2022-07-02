import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import useVideoList from "../hook/useVideoList";
import Video from "./Video";

export default function Videos() {
  const [page, setPage] = useState(1);
  const { videos, error, loading, hasMore } = useVideoList(page);
  return (
    <div>
      {videos.length > 0 &&
        videos.map((video) => (
          <InfiniteScroll
            dataLength={videos.length}
            hasMore={hasMore}
            next={() => setPage(page + 8)}
            loader={<h4>Loading...</h4>}
          >
            <Video
              title={video.title}
              key={video.youtubeID}
              noq={video.noq}
              id={video.youtubeID}
            />
          </InfiniteScroll>
        ))}
      {!loading && videos.length === 0 && <div>Loading...</div>}
      {!error && <div>No data found!</div>}
    </div>
  );
}
