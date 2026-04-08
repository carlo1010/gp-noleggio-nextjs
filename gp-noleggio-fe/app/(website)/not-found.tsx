import Link from "next/link";
import Image from "next/image";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function NotFound() {
  return (
    <>
      <Header dark={true} />

      <main className="bg-white pt-28 pb-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16 lg:px-24 lg:py-16 md:py-12 px-0 py-12">
            {/* Text block */}
            <div className="w-full xl:w-1/2 relative pb-8 lg:pb-0">
              <div>
                <h1 className="my-2 text-gray-900 font-bold text-2xl md:text-3xl">
                  404 - La pagina richiesta non esiste
                </h1>
                <p className="my-4 text-gray-700">
                  Ci dispiace, i nostri tecnici sono stati già avvisati.
                </p>
                <Link
                  href="/"
                  className="inline-block my-2 border rounded md py-3 px-6 text-center bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50"
                >
                  Torna alla Home!
                </Link>
              </div>

              {/* Illustration (optional 404/car) */}
              <div className="mt-8">
                <Image
                  src="/vacanza.jpg"
                  alt="Car on the road illustration"
                  width={800}
                  height={500}
                  className="w-full h-auto rounded-2xl object-cover shadow-md"
                  priority
                />
              </div>
            </div>

            {/* Car image/theme */}
            <div className="w-full xl:w-auto flex justify-center">
              <Image
                src="/auto.png"
                alt="Car theme"
                width={420}
                height={280}
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
