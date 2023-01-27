import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import pageFetcher from "../../services/pageFetcher";
import { TPage } from "../../src/types/types";
import SearchBar from "../../src/components/SearchBar";
import ModalOnDelete from "../../src/components/modal/ModalOnDelete";

export default function index() {
  const [pages, setPages] = useState<Partial<TPage>[]>([]);
  const [itemToDelete, setItemToDelete] = useState<string | null>();
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    pageFetcher.getPages().then((response) => {
      setPages(response);
    });
  }, []);

  const handleItemToDelete = (e: React.MouseEvent<HTMLButtonElement>): void => {
    setShowModal(true);
    setItemToDelete(e.currentTarget.id);
  };

  const handleDeleteConfirmed = (): void => {
    pageFetcher.deletePageById(itemToDelete as string).then(() => {
      pageFetcher.getPages().then((data) => setPages(data));
    });
    setShowModal(false);
  };

  const handleDeleteCancelled = (): void => {
    setShowModal(false);
  };

  return (
    <div className="w-full bg-lightgrey">
      <SearchBar />
      <div className="rounded-xl">
        <table className="w-[90%] h-[50px] mt-[3em] ml-[5%] text-xl border border-black border-1 rounded-[10px] bg-white  drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)]">
          <thead className="h-[50px] rounded-t-[10px]">
            <tr>
              <th>Name</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody className="rounded-b-[10px]">
            {pages
              .sort((a, b) =>
                (a.title as string) > (b.title as string) ? 1 : -1
              )
              .map((page) => (
                <tr
                  key={page.id}
                  className="h-[45px] odd:bg-lightgrey even:bg-white last:rounded-b-[10px]"
                >
                  <td className="border border-black px-5 last:rounded-bl-[10px]">
                    {page.title}
                  </td>

                  <td className="border text-center">
                    <button id={page.id} type="button">
                      <Link href={`/pages/${page.id}`}>📝</Link>
                    </button>
                  </td>

                  <td className="border text-center last:rounded-br-[10px]">
                    <button
                      id={page.id}
                      type="button"
                      onClick={handleItemToDelete}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="w-[50px] mt-[1em] ml-[5%]">
        <button type="button" onClick={() => router.push("/pages/new-page")}>
          <Image width={50} height={50} src="/plus.svg" alt="logo-plus" />
        </button>
      </div>
      {showModal && (
        <ModalOnDelete
          handleDeleteConfirmed={handleDeleteConfirmed}
          handleDeleteCancelled={handleDeleteCancelled}
        />
      )}
    </div>
  );
}
