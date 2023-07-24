import StoreAPI from "@/network/features/store.api";
import { CheckIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import React from "react";

function SuccessCheckout({store}) {
  const router = useRouter();
  return (
    <section className="w-full flex self-start justify-center">
      <div className="mt-20">
        <div className="p-10 w-fit mx-auto bg-green-100 rounded-full">
          <CheckIcon className="w-20 h-20 text-green-500" />
        </div>
        <h2 className="text-center py-2 font-medium">Checkout Berhasil</h2>
        <h2 className="text-center py-2">
          Konfirmasi pembayaran melalui Whatsapp dan tekan tombol dibawah ini
        </h2>
        <div className="flex justify-center gap-3">
          <button
            onClick={() => router.push("/transaction")}
            className="bg-warning text-white py-2 px-4 rounded-lg"
          >
            Lihat Pesanan
          </button>
          <a href={`https://wa.me/62${store.noTlp.slice(1)}`} className="bg-success text-white py-2 px-4 rounded-lg">
            Hubungi Toko
          </a>
        </div>
      </div>
    </section>
  );
}


export async function getServerSideProps(context) {
  try {
    const { storeId } = context.query;
    const store = await StoreAPI.getOne(storeId);
    return {
      props: { store },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}

export default SuccessCheckout;
