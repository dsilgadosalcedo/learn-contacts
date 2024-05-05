import "@lottiefiles/lottie-player";

export default function Index() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <lottie-player
        autoplay
        loop
        mode="normal"
        src="/community.json"
        // style="width: 320px"
      >
      </lottie-player>
    </div>
  );
}