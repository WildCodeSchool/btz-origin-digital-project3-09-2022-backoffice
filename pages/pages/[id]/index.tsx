import React, { useState, useEffect, ChangeEvent } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { TSectionItem, TSection, TSectionRow } from "../../../src/types/types";
import pageFetcher from "../../../services/pageFetcher";
import sectionsTypes from "../../../src/types/sectionsTypes";
import sectionFetcher from "../../../services/sectionFetcher";
import ModalAlert from "../../../src/components/modal/ModalAlert";

function VideoEdit() {
  const router = useRouter();
  const { id } = router.query;
  const [title, setTitle] = useState<string>("");
  const [rows, setRows] = useState<TSectionItem[]>([]);
  const [rowCounter, setRowCounter] = useState<number>(1);

  const [createMode, setCreateMode] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<Partial<TSectionItem>>();
  const [sections, setSections] = useState<Partial<TSection[]>>();

  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      const data = pageFetcher.getPageById(id as string).then((response) => {
        if (response !== null) {
          const {
            title: pageTitle,
            pagesSectionsStatic,
            pagesSectionsDynamic,
            pagesAdvertisings,
          } = response;
          console.log(response);

          setRows([]);
          setTitle(pageTitle);
          const rowsInit: TSectionItem[] = [];
          pagesSectionsStatic?.forEach((row: TSectionRow) => {
            if (row.sectionsStatics !== undefined) {
              const typeLatest =
                row.sectionsStatics.isHero === true
                  ? "Hero Slider"
                  : "Carrousel Static";
              rowsInit.push({
                type: "static-sections",
                typeLatest,
                sectionName: row.sectionsStatics.title,
                sectionId: row.sectionsStatics.id,
                position: row.position,
                sectionCount: rowCounter,
              });
            }
          });
          pagesSectionsDynamic?.forEach((row: TSectionRow) => {
            if (row.sectionsDynamic !== undefined) {
              const typeLatest =
                row.sectionsDynamic.isGrid === true
                  ? "Grid Dynamic"
                  : "Carrousel Dynamic";
              rowsInit.push({
                type: "dynamic-sections",
                typeLatest,
                sectionName: row.sectionsDynamic.title,
                sectionId: row.sectionsDynamic.id,
                position: row.position,
                sectionCount: rowCounter,
              });
            }
          });
          pagesAdvertisings?.forEach((row) => {
            if (row.advertisings !== undefined) {
              rowsInit.push({
                type: "advertisings",
                typeLatest: "Advertising",
                sectionName: row.advertisings.title,
                sectionId: row.advertisings.id,
                position: row.position,
                sectionCount: rowCounter,
              });
            }
          });
          rowsInit.sort((a, b) => {
            const keyA = new Date(a.position);
            const keyB = new Date(b.position);
            if (keyA < keyB) return -1;
            if (keyA > keyB) return 1;
            return 0;
          });
          rowsInit.forEach((row, index) => {
            const item: TSectionItem = row;
            item.sectionCount = index + 1;
            return item;
          });
          setRows(rowsInit);
        }
      });
    }
  }, [id]);

  const feedSectionSelector = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    const type = value.split("/")[0];
    let typeLatest = "";
    switch (type) {
      case "static-sections":
        if (value.split("/")[1] === "true") {
          typeLatest = "Hero Slider";
        } else {
          typeLatest = "Carrousel Static";
        }
        break;
      case "dynamic-sections":
        if (value.split("/")[1] === "true") {
          typeLatest = "Grid Dynamic";
        } else {
          typeLatest = "Carrousel Dynamic";
        }
        break;
      case "advertisings":
        typeLatest = "Advertising";
        break;
      default:
        typeLatest = "";
    }

    const status = /true/.test(value.split("/")[1] as string);
    sectionFetcher
      .getSectionByTypeAndStatus(type as string, status)
      .then((response) => {
        setSections(response);
      });
    setCurrentRow({
      ...currentRow,
      type: type as string,
      typeLatest: typeLatest as string,
    });
  };

  const sectionSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    setCurrentRow({
      ...currentRow,
      sectionId: value.split("/")[0],
      sectionName: value.split("/")[1],
      position: rowCounter,
      sectionCount: rowCounter,
    });
  };

  const rowSave = () => {
    if (currentRow?.type !== undefined && currentRow?.sectionId !== undefined) {
      setCreateMode(!createMode);
      setRows([...rows, currentRow as TSectionItem]);
      console.log(...rows);
    }
  };

  const refreshRowPosition = () => {
    rows.forEach((row, index) => {
      const updatedRow = { ...row };
      updatedRow.position = index + 1;
      rows[index] = updatedRow;
    });
    setRows([...rows]);
  };

  const moveRowUp = (row: TSectionItem) => {
    if (!rows) return;

    const index = rows.indexOf(row);
    if (index < 1) return;

    const [prevRow] = rows.slice(index - 1, index);
    if (!prevRow) return;

    rows[index - 1] = row;
    rows[index] = prevRow;
    setRows([...rows]);
    refreshRowPosition();
  };

  const moveRowDown = (row: TSectionItem) => {
    if (!rows) return;

    const index = rows.indexOf(row);
    if (index === -1 || index === rows.length - 1) return;

    const [nextRow] = rows.slice(index + 1, index + 2);
    if (!nextRow) return;

    rows[index + 1] = row;
    rows[index] = nextRow;
    setRows([...rows]);
    refreshRowPosition();
  };

  const deleteRow = (row: TSectionItem) => {
    const index = rows.indexOf(row);
    rows.splice(index, 1);
    refreshRowPosition();
    setRows([...rows]);
    setRowCounter(rows.length + 1);
  };

  const handleItemToCreate = () => {
    const pagesSectionsStaticData: { id: string; position: number }[] = [];
    const pagesSectionsDynamicData: { id: string; position: number }[] = [];
    const pagesAdvertisingsData: { id: string; position: number }[] = [];
    rows.forEach((row) => {
      if (row.type === "static-sections") {
        pagesSectionsStaticData.push({
          id: row.sectionId,
          position: row.position,
        });
      }
      if (row.type === "dynamic-sections") {
        pagesSectionsDynamicData.push({
          id: row.sectionId,
          position: row.position,
        });
      }
      if (row.type === "advertisings") {
        pagesAdvertisingsData.push({
          id: row.sectionId,
          position: row.position,
        });
      }
    });
    const page = {
      title,
      pagesSectionsStaticData,
      pagesSectionsDynamicData,
      pagesAdvertisingsData,
    };
    if (
      page.title.length === 0 ||
      +page.pagesAdvertisingsData.length +
        +page.pagesSectionsDynamicData.length +
        +page.pagesSectionsStaticData.length ===
        0
    ) {
      setShowModal(true);
      return;
    }
    pageFetcher.deletePageById(id as string);
    pageFetcher.createPage(page).then(() => router.push("/pages"));
  };

  const handleItemToCancel = () => {
    setCreateMode(!createMode);
  };

  const handleDeleteCancelled = (): void => {
    setShowModal(false);
  };

  return (
    <div>
      <div className="container-fields ml-[5%] mt-[5%]">
        <label htmlFor="title" className="title-field">
          Page title
          <input
            type="text"
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
                      <p className="w-full">{row.typeLatest}</p>
                    </td>
                    <td className="border border-black px-5 last:rounded-bl-[10px]">
                      <p className="w-full">{row.sectionName}</p>
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

              {createMode && (
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
                      {sections !== undefined &&
                        sections.length > 0 &&
                        sections
                          .sort((a, b) => {
                            if (a !== undefined && b !== undefined) {
                              return a.title > b.title ? 1 : -1;
                            }
                            return 0;
                          })
                          .map((section) => {
                            if (section !== undefined) {
                              return (
                                <option
                                  className="w-full"
                                  key={section.id}
                                  value={`${section.id}/${section.title}`}
                                >
                                  {section.title}
                                </option>
                              );
                            }
                            return null;
                          })}
                    </select>
                  </td>
                  <td className="border text-center">{rowCounter}</td>
                  {!createMode && (
                    <td className="h-full w-full border-t flex justify-around items-center">
                      <button
                        className="w-4 h-4"
                        type="button"
                        onClick={(row: any) => moveRowUp(row)}
                      >
                        ⬆️
                      </button>
                      <button
                        className="w-4 h-4"
                        type="button"
                        onClick={(row: any) => moveRowDown(row)}
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
                    <button type="button" onClick={handleItemToCancel}>
                      CANCEL
                    </button>
                  </td>
                </tr>
              )}
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
            <Image width={50} height={50} src="/plus.svg" alt="logo-plus" />
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
      {showModal && (
        <ModalAlert
          message="Please fill the title and at least one section"
          handleDeleteCancelled={handleDeleteCancelled}
        />
      )}
    </div>
  );
}

export default VideoEdit;
