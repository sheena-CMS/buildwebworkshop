export function Slide13(_: { goNext: () => void }) {
  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
        Stay connected.
      </h2>
      <p className="text-xl md:text-2xl text-white/90">
        Thanks for building with me today.
      </p>

      <div className="flex flex-col gap-8 mt-2">
        {/* Follow on LinkedIn */}
        <div className="flex items-start gap-6">
          <div className="flex flex-col gap-2 shrink-0">
            <div className="w-44 h-44 md:w-52 md:h-52 bg-white/10 border-2 border-dashed border-white/40 rounded-lg flex items-center justify-center text-white/60 text-sm text-center px-2">
              [Upload: LinkedIn QR code]
            </div>
            <p className="text-xs md:text-sm text-white/60 max-w-[13rem]">
              Scan to follow Sheena on LinkedIn
            </p>
          </div>
          <div className="flex-1 pt-2">
            <h3 className="text-2xl md:text-3xl font-bold">Follow on LinkedIn</h3>
          </div>
        </div>

        {/* Subscribe */}
        <div>
          <h3 className="text-2xl md:text-3xl font-bold mb-1">
            Subscribe for updates
          </h3>
          <a
            href="https://www.changemadesimple.com.au"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl md:text-2xl font-semibold underline"
            style={{ color: "#FF4DA6" }}
          >
            changemadesimple.com.au
          </a>
          <p className="text-sm md:text-base text-white/60 mt-1">
            New tools, workshops, and resources — straight to your inbox
          </p>
        </div>

        {/* Book a chat */}
        <div>
          <h3 className="text-2xl md:text-3xl font-bold mb-3">Book a chat</h3>
          <a
            href="https://calendly.com/sheena-changemadesimple/build-made-simple-check-in"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-7 py-4 rounded-md text-lg md:text-xl font-semibold text-white"
            style={{ backgroundColor: "#FF4DA6" }}
          >
            Book a 1:1 with Sheena ↗
          </a>
        </div>

        {/* Tag */}
        <div>
          <h3 className="text-2xl md:text-3xl font-bold mb-2">
            Tag me when you ship
          </h3>
          <p className="text-lg md:text-xl text-white">
            Built something you want to share? Tag me on LinkedIn{" "}
            <span className="font-semibold">(@sheenakarim)</span> — I would love
            to see it.
          </p>
        </div>
      </div>

      <p
        className="text-2xl md:text-4xl font-black text-center mt-6"
        style={{ color: "#FF4DA6" }}
      >
        That is it. You built something real today.
      </p>
    </div>
  );
}
