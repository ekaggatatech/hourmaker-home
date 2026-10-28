import { useState } from "react";

const YoutubeVideoThumbnail = ({
  videoId,
  title,
  fallbackImage,
  className,
}) => {
  const candidates = [
    `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
    `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
    `https://img.youtube.com/vi/${videoId}/sddefault.jpg`,
    `https://img.youtube.com/vi/${videoId}/default.jpg`,
    fallbackImage,
  ].filter(Boolean);
  const [candidateIndex, setCandidateIndex] = useState(0);
  const src = candidates[candidateIndex];

  const advanceCandidate = () => {
    if (candidateIndex < candidates.length - 1) {
      setCandidateIndex(candidateIndex + 1);
    }
  };

  return (
    <img
      key={`${videoId}-${candidateIndex}`}
      src={src}
      alt={title}
      className={className}
      onLoad={(event) => {
        const { naturalWidth } = event.currentTarget;
        if (src.startsWith("https://img.youtube.com/") && naturalWidth <= 120) {
          advanceCandidate();
        }
      }}
      onError={advanceCandidate}
    />
  );
};

export default YoutubeVideoThumbnail;
