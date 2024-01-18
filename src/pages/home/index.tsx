// react
import React, { useEffect, useState } from "react";

import axios from "axios";
import { Rank } from "types/rank";
import Button from "components/atoms/Button";
import useDrawCanvas from "hooks/useDrawCanvas";
import Canvas from "components/atoms/Canvas";
import { cloneDeep } from "lodash";
import Table from "components/organisms/Table";
import MergeCanvas from "components/atoms/MergeCanvas";
import Modal from "components/organisms/Modal";

const instance = axios.create({
  baseURL: "https://itunes.apple.com/us/rss",
});

export default function Home() {
  const [openModalId, setOpenModalId] = useState<string | null>(null);
  const [ranks, setRanks] = useState<Rank[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const {
    ref: leftRef,
    setPainting: leftPainting,
    drawFn: leftDraw,
  } = useDrawCanvas({ strokeStyle: "#282aa1", init: Boolean(openModalId) });
  const {
    ref: rightRef,
    setPainting: rightPainting,
    drawFn: rightDraw,
  } = useDrawCanvas({ strokeStyle: "#A52A2A", init: Boolean(openModalId) });

  const getMusicLanks = async () => {
    try {
      setIsLoading(true);
      const { data } = await instance.get(`/topalbums/limit=100/json`);
      setRanks(data.feed.entry);
    } catch (error) {
      console.error(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getMusicLanks();
  }, []);

  const handleOpenModal = (id: string) => {
    if (openModalId !== id) {
      setOpenModalId(id);
    }
  };

  const handleCloseModal = () => {
    setOpenModalId(null);
  };

  const handleClickConfirm = () => {
    const newRanks = cloneDeep(ranks);
    const newRank = newRanks.find((rank) => rank.id.label === openModalId);
    if (!newRank) return;
    newRank.isMerge = true;
    setRanks(newRanks);
    setOpenModalId(null);
  };

  return (
    <div className="view">
      <div className="wrap">
        <h1>MUSIC RANKING</h1>
        {isError &&
          "오류로 인해 데이터를 불러오지 못했습니다. 새로고침 해주세요."}
        {isLoading && "로딩 중..."}
        {ranks.length > 0 && (
          <Table
            columns={[
              { header: "제목", dataKeys: ["title", "label"] },
              { header: "가수이름", dataKeys: ["im:artist", "label"] },
              {
                header: "카테고리",
                dataKeys: ["category", "attributes", "label"],
              },
              { header: "가격", dataKeys: ["im:price", "label"] },
              {
                header: "앨범 표지 생성",
                dataKeys: [],
                renderCell: (data: Rank) =>
                  data.isMerge ? (
                    <MergeCanvas
                      canvases={[leftRef.current, rightRef.current]}
                    />
                  ) : (
                    <button onClick={() => handleOpenModal(data.id.label)}>
                      표지 생성
                    </button>
                  ),
              },
            ]}
            data={ranks}
          />
        )}
        {openModalId && (
          <Modal>
            <Modal.Layout>
              <Modal.Title>앨범 생성</Modal.Title>
              <Modal.Body>
                <div className="canvas-wrap">
                  <div>
                    <Canvas
                      ref={leftRef}
                      onMouseDown={() => leftPainting(true)}
                      onMouseUp={() => leftPainting(false)}
                      onMouseMove={(e) => leftDraw(e)}
                      onMouseLeave={() => leftPainting(false)}
                    />
                  </div>
                  <div>
                    <Canvas
                      ref={rightRef}
                      onMouseDown={() => rightPainting(true)}
                      onMouseUp={() => rightPainting(false)}
                      onMouseMove={(e) => rightDraw(e)}
                      onMouseLeave={() => rightPainting(false)}
                    />
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={handleCloseModal}>취소</Button>
                <Button onClick={handleClickConfirm}>결합</Button>
              </Modal.Footer>
            </Modal.Layout>
          </Modal>
        )}
      </div>
    </div>
  );
}
