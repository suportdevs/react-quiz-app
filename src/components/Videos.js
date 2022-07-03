import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import useVideoList from "../hook/useVideoList";
import Video from "./Video";

export default function Videos() {
  const [page, setPage] = useState(8);
  const { videos, error, loading, hasMore } = useVideoList(page);
  return (
    <div>
      {videos.length > 0 &&
        videos.map((video) => (
          <InfiniteScroll
            dataLength={videos.length}
            hasMore={hasMore}
            next={() => setPage(page + 8)}
            // loader="Loading..."
          >
            {video.noq > 0 ? (
              <Link to="/quiz">
                <Video
                  title={video.title}
                  key={video.youtubeID}
                  noq={video.noq}
                  id={video.youtubeID}
                />
              </Link>
            ) : (
              <Video
                title={video.title}
                key={video.youtubeID}
                noq={video.noq}
                id={video.youtubeID}
              />
            )}
          </InfiniteScroll>
        ))}
      {!loading && videos.length === 0 && (
        <div style={{ textAlign: "center" }}>Loading...</div>
      )}
      {!error && <div style={{ textAlign: "center" }}>No data found!</div>}
    </div>
  );
}
