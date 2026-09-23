import Image from "next/image";

export function PixelCat() {
  return (
    <div className="absolute top-[60px] right-[65px] select-none pointer-events-none z-10">
      <Image src="/images/decorative/cat-hoppip-transparent.gif" alt="Cat pixel art" width={180} height={180} unoptimized className="w-[180px] h-[180px] object-contain" />
    </div>
  );
}
