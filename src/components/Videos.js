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
      {videos.length > 0 && (
        <InfiniteScroll
          dataLength={videos.length}
          hasMore={hasMore}
          next={() => setPage(page + 8)}
          loader="Loading..."
        >
          {videos.map((video, index) =>
            video.noq > 0 ? (
              <Link to={`/quiz/${video.youtubeID}`} key={index}>
                <p>{video.key}</p>
                <Video
                  title={video.title}
                  noq={video.noq}
                  id={video.youtubeID}
                />
              </Link>
            ) : (
              <Video
                title={video.title}
                key={index}
                noq={video.noq}
                id={video.youtubeID}
              />
            )
          )}
        </InfiniteScroll>
      )}
      {!loading && videos.length === 0 && (
        <div style={{ textAlign: "center" }}>Loading...</div>
      )}
      {!error && <div style={{ textAlign: "center" }}>No data found!</div>}
    </div>
  );
}
