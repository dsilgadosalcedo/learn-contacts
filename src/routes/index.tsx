// ignore ts on this page


import "@lottiefiles/lottie-player";

export default function IndexPage() {
  return (
    // @ts-ignore
    <div className="w-full h-full flex justify-center items-center">
      {/* @ts-ignore */}
      <lottie-player autoplay loop mode="normal" src="/community.json"></lottie-player>
    {/* @ts-ignore */}
    </div>
  );
}