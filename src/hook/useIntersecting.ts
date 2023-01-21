import { RefObject, useCallback, useEffect, useRef, useState } from "react";

const useIntersecting = (targetRef: RefObject<HTMLElement>, isSuccess: boolean) => {
  const observerRef = useRef<IntersectionObserver>();
  const [Intersecting, setIntersecting] = useState(false);

  // 옵저버로 FetchMore 보여지고 있는지 확인
  const getObserver = useCallback(() => {
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(entries => {
        setIntersecting(entries[0]?.isIntersecting);
      });
    }
    return observerRef.current;
  }, []);

  // 옵저버 실행
  useEffect(()=>{
    if (targetRef.current) {
      getObserver().observe(targetRef.current);
    }
  }, [getObserver, targetRef]);

  return isSuccess && Intersecting;
}

export default useIntersecting;