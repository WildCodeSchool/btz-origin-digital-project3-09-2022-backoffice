import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import sectionFetcher from "../../../../services/sectionFetcher";
import {
  TAdvertsing,
  TSectionDynamic,
  TSectionStatic,
} from "../../../../src/types/types";

export default function SectionItem() {
  const [sectionItem, setSectionItem] = useState<
    TAdvertsing[] | TSectionDynamic[] | TSectionStatic[]
  >([]);
  const router = useRouter();

  useEffect(() => {
    if (router.query.section && router.query.id) {
      sectionFetcher
        .getSectionById(router.query.section, router.query.id)
        .then((response) => setSectionItem(response));
    }
  }, [router]);

  return (
    <div>
      <h1>id :{sectionItem.id}</h1>
      <h1>title : {sectionItem.title}</h1>
      <h1>description : {sectionItem.description}</h1>
      {sectionItem.isHero && <h1>Hero {sectionItem.isHero}</h1>}
      {sectionItem.isGrid && <h1>Grid {sectionItem.isGrid}</h1>}
    </div>
  );
}
