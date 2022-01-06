import React, { useEffect, useRef, useState } from "react";

import styles from "./Slider.module.css";

/**
 *  desktop first
 * props: responsive [
 * {
 *    breakpoint: int,
 *    slidesToShow: int,
 *    slidesToScroll: int
 * }
 * ]
 */

export default function Slider(props) {
  const sliderRef = useRef();
  const prevBtnRef = useRef();
  const nextBtnRef = useRef();
  const slidesToShow = props.slidesToShow || 1;
  const slidesToScroll = props.slidesToScroll || 1;
  const space = props.space || 0;

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPgae] = useState(1);

  const nextPage = () => setCurrentPage((page) => page + 1);
  const prevPage = () => setCurrentPage((page) => page - 1);

  // css
  useEffect(() => {
    // slider
    sliderRef.current.style.gap = `${space}px`;
    [...sliderRef.current.children].forEach((ele) => {
      Object.assign(ele.style, {
        flex: `calc((100% - ${
          (slidesToShow - 1) * space
        }px) / ${slidesToShow}) 0 0`,
      });
    });

    // slider control
    const { left, right, y, height } =
      sliderRef.current.getBoundingClientRect();

    prevBtnRef.current &&
      Object.assign(prevBtnRef.current.style, {
        top: `${y + height / 2}px`,
        left: `calc(${left}px - 4rem)`,
      });

    nextBtnRef.current &&
      Object.assign(nextBtnRef.current.style, {
        top: `${y + height / 2}px`,
        left: `calc(${right}px + 4rem)`,
      });
  }, []);

  // change page css
  useEffect(() => {
    const childrenWidth = sliderRef.current.children[0]
      ? sliderRef.current.children[0].clientWidth
      : 0;
    sliderRef.current.style.transform = `translateX(calc(${
      -(currentPage - 1) *
      (childrenWidth * slidesToScroll + slidesToScroll * space)
    }px))`;
  }, [currentPage]);

  // hide display slider control
  useEffect(() => {
    if (currentPage <= 1) {
      prevBtnRef.current.classList.add(styles["hide"]);
    } else {
      prevBtnRef.current.classList.remove(styles.hide);
    }

    if (currentPage >= totalPage) {
      nextBtnRef.current.classList.add(styles.hide);
    } else {
      nextBtnRef.current.classList.remove(styles.hide);
    }
  }, [currentPage, totalPage]);

  // get total page
  useEffect(() => {
    setTotalPgae(
      Math.ceil(
        sliderRef.current ? sliderRef.current.children.length / slidesToShow : 1
      )
    );
  }, [props.children]);

  // responsive
  useEffect(() => {
    if (props.responsive) {
      props.responsive.forEach((item) => {
        const media = window.matchMedia(`(max-width: ${item.breakpoint}px)`);
        if (media.matches) {
          // slider
          sliderRef.current.style.gap = `${item.space}px`;
          [...sliderRef.current.children].forEach((ele) => {
            Object.assign(ele.style, {
              flex: `calc((100% - ${
                (item.slidesToShow - 1) * item.space
              }px) / ${item.slidesToShow}) 0 0`,
            });
          });

          console.log("match");
        }
      });
    }
  }, []);

  return (
    <div
      className={`${styles["slider__container"]} ${
        props.className ? props.className : ""
      }`}
    >
      <div
        onClick={prevPage}
        ref={prevBtnRef}
        className={`${styles["slider__control"]} ${styles["slider__control--prev"]}`}
      >
        <i className="fas fa-angle-left"></i>
      </div>

      <div
        onClick={nextPage}
        ref={nextBtnRef}
        className={`${styles["slider__control"]} ${styles["slider__control--next"]}`}
      >
        <i className="fas fa-angle-right"></i>
      </div>

      <div ref={sliderRef} className={styles.slider}>
        {props.children}
      </div>
    </div>
  );
}
