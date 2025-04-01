const Shimmer = ({ className = "" }) => {
  return (
    <div className={`bg-gray-300 animate-pulse rounded-lg ${className}`} />
  );
};

const SpeakerTileLayoutShimmer = () => {
  return (
    <div className="w-full h-auto grid grid-cols-2 lg:grid-cols-3 grid-rows-1 h-full">
      {/* Main Tile Shimmer */}
      <div className="col-span-1 lg:col-span-2 h-auto row-span-1 bg-gray-500">
        <Shimmer className="w-full h-64 lg:h-96" />
      </div>

      {/* Sub Tile Shimmer */}
      <div className="col-span-1 h-auto row-span-1">
        <Shimmer className="w-full h-64 lg:h-96" />
      </div>
    </div>
  );
};

export default SpeakerTileLayoutShimmer;
