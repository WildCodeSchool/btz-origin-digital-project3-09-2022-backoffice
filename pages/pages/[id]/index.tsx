import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { TPage, TSectionItem } from "../../../src/types/types";
import pageFetcher from "../../../services/pageFetcher";
import plus from "../../../src/assets/plus.svg";

function VideoEdit() {
  const router = useRouter();
  const { id } = router.query;
  const [page, setPage] = useState<TPage>({});

  const [title, setTitle] = useState<string>("");
  const [currentRow, setCurrentRow] = useState<Partial<TSectionItem>>();
  const [rows, setRows] = useState<Partial<TPage>[]>([]);
  const [rowCounter, setRowCounter] = useState<number>(1);

  useEffect(() => {
    if (id) {
      const data = pageFetcher.getPageById(id as string).then((response) => {
        const {
          title: pageTitle,
          pagesSectionsStatic,
          pagesSectionsDynamic,
          pagesAdvertisings,
        } = response;

        setTitle(pageTitle);
        const rowsInit: Partial<TPage>[] = [];
        pagesSectionsStatic.forEach((row) => {
          rowsInit.push(row);
        });
        pagesSectionsDynamic.forEach((row) => {
          rowsInit.push(row);
        });
        pagesAdvertisings.forEach((row) => {
          rowsInit.push(row);
        });
        rowsInit.sort((a, b) => {
          const keyA = new Date(a.position);
          const keyB = new Date(b.position);
          if (keyA < keyB) return -1;
          if (keyA > keyB) return 1;
          return 0;
        });
        setRows(rowsInit);
        console.log("rows:", rowsInit);
      });
    }
  }, [router]);

  const rowType = (row: Partial<TPage>) => {
    let response = "";
    if ("sectionsDynamic" in row) {
      if (row.sectionsDynamic.isGrid === true) {
        response = "Grid Dynamic";
      } else {
        response = "Carrousel Dynamic";
      }
    }
    if ("sectionsStatics" in row) {
      if (row.sectionsStatics.isHero === true) {
        response = "Hero Slider";
      } else {
        response = "Carrousel Static";
      }
    }
    if ("advertisings" in row) {
      response = "Advertising";
    }
    return response;
  };

  const rowSection = (row: Partial<TPage>) => {
    let response = "";
    if ("sectionsDynamic" in row) {
      if (row.sectionsDynamic.isGrid === true) {
        response = row.sectionsDynamic.title;
      } else {
        response = row.sectionsDynamic.title;
      }
    }
    if ("sectionsStatics" in row) {
      if (row.sectionsStatics.isGrid === true) {
        response = row.sectionsStatics.title;
      } else {
        response = row.sectionsStatics.title;
      }
    }
    if ("advertisings" in row) {
      response = row.advertisings.title;
    }
    return response;
  };

  return (
    <div>
      <div className="container-fields ml-[5%] mt-[5%]">
        <label htmlFor="title" className="title-field">
          Page title
          <input
            className="input-field"
            defaultValue={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
      </div>

      <div className="w-full bg-lightgrey">
        <div className="rounded-xl">
          <table className="w-[90%] h-[50px] mt-[3em] ml-[5%] text-xl border border-black border-1 rounded-[10px] bg-white  drop-shadow-[0_5px_5px_rgba(0,0,0,0.25)]">
            <thead className="h-[50px] rounded-t-[10px]">
              <tr>
                <th>Type</th>
                <th>Section</th>
                <th>Position</th>
                <th>Move</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody className="rounded-b-[10px]">
              {rows &&
                rows.map((row) => (
                  <tr className="h-[45px] odd:bg-lightgrey even:bg-white last:rounded-b-[10px]">
                    <td className="border border-black px-5 last:rounded-bl-[10px]">
                      <p className="w-full">{rowType(row)}</p>
                    </td>
                    <td className="border border-black px-5 last:rounded-bl-[10px]">
                      <p className="w-full">{rowSection(row)}</p>
                    </td>
                    <td className="border text-center">{row.position}</td>
                    <td className="h-full w-full border-t flex justify-around items-center">
                      <button
                        className="w-4 h-4"
                        type="button"
                        onClick={() => moveRowUp(row)}
                      >
                        ⬆️
                      </button>
                      <button
                        className="w-4 h-4"
                        type="button"
                        onClick={() => moveRowDown(row)}
                      >
                        ⬇️
                      </button>
                    </td>
                    <td className="px-2 border text-center">
                      <button
                        className="w-full h-full bg-red"
                        type="button"
                        onClick={() => deleteRow(row)}
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}

              {/* {createMode && (
                <tr className="h-[45px] odd:bg-lightgrey even:bg-white">
                  <td className="border border-black px-5">
                    <select
                      className="w-full"
                      onChange={(e) => feedSectionSelector(e)}
                    >
                      <option className="w-full" value="0">
                        Select section type
                      </option>
                      {sectionsTypes
                        .sort((a, b) => (a.name > b.name ? 1 : -1))
                        .map((type) => (
                          <option
                            className="w-full"
                            key={type.id}
                            value={`${type.section}/${
                              type.isHero || type.isGrid || false
                            }`}
                          >
                            {type.name}
                          </option>
                        ))}
                    </select>
                  </td>
                  <td className="border border-black px-5 last:rounded-bl-[10px]">
                    <select
                      className="w-full"
                      onChange={(e) => sectionSelect(e)}
                    >
                      <option className="w-full" value="0">
                        Select section
                      </option>
                      {sections &&
                        sections
                          .sort((a, b) => (a.title > b.title ? 1 : -1))
                          .map((section) => (
                            <option
                              className="w-full"
                              key={section.id}
                              value={`${section.id}/${section.title}`}
                            >
                              {section.title}
                            </option>
                          ))}
                    </select>
                  </td>
                  <td className="border text-center">{rowCounter}</td>
                  {!createMode && (
                    <td className="h-full w-full border-t flex justify-around items-center">
                      <button
                        className="w-4 h-4"
                        type="button"
                        onClick={() => moveRowUp(row)}
                      >
                        ⬆️
                      </button>
                      <button
                        className="w-4 h-4"
                        type="button"
                        onClick={() => moveRowDown(row)}
                      >
                        ⬇️
                      </button>
                    </td>
                  )}
                  <td className="px-2 border text-center bg-[#008000]">
                    <button
                      className="w-full h-full"
                      type="button"
                      onClick={rowSave}
                    >
                      SAVE
                    </button>
                  </td>
                  <td className="px-2 border text-center bg-[#FF0000]">
                    <button
                      className="w-full h-full bg-red"
                      type="button"
                      onClick={handleItemToCancel}
                    >
                      CANCEL
                    </button>
                  </td>
                </tr>
              )} */}
            </tbody>
          </table>
        </div>
        <div className="flex w-[full mt-[1em] ml-[5%]">
          <button
            className="mr-10"
            type="button"
            onClick={() => {
              setCurrentRow({});
              setSections([]);
              setRowCounter(rows.length + 1);
              setCreateMode(!createMode);
            }}
          >
            <Image src={plus} width={50} height={50} alt="logo-plus" />
          </button>
        </div>
        <div className="flex justify-around w-full">
          <input
            className="submit-btn"
            type="submit"
            onClick={() => handleItemToCreate()}
          />
        </div>
      </div>
    </div>
  );
}

export default VideoEdit;
