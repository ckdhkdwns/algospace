import { RefObject, useEffect, useRef } from "react";

export default function useModal(setIsModalOpen: Function, buttonRef: RefObject<HTMLButtonElement> | null) {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // 이벤트 핸들러 함수
    const handler = (e: any) => {
      // mousedown 이벤트가 발생한 영역이 모달창이 아닐 때, 모달창 제거 처리
      if(buttonRef == null) {
        if (modalRef?.current && !modalRef.current.contains(e.target)) {
            setIsModalOpen(false);
          }
      } else {
        if (modalRef?.current && (!buttonRef.current?.contains(e.target) && (!modalRef.current.contains(e.target)))) {
            setIsModalOpen(false);
        }
      }
      
    };
    // 이벤트 핸들러 등록
    document.addEventListener("mouseup", (e) => handler(e));
    // document.addEventListener('touchstart', handler); // 모바일 대응
    //f
  }, []);

  return modalRef;
}
