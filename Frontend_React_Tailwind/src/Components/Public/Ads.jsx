import {useState, useEffect} from 'react';
import axios from 'axios';
import React from 'react';
import 'keen-slider/keen-slider.min.css';
import {useKeenSlider} from 'keen-slider/react';
export default function Ads() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    }
  });
  const [listBanner, set_listBanner] = useState([]);
  const [state, setState] = useState({});
  // Thực thi lúc bắt đầu trang web
  useEffect(() => {
    // Lấy danh sách banner và tổng số trang cần phân trang
    axios
      .get('https://localhost:7216/api/TrangChu/ListBanner')
      .then(res => {
        set_listBanner(res.data);
        setState({
          data: res.data,
          done: true
        });
      })
      .catch(err => {
        setState({
          error: err,
          done: false
        });
      });
  }, []);
  if (state.done)
    return (
      <>
        <div className='navigation-wrapper'>
          <div ref={sliderRef} className='keen-slider'>
          {listBanner.map(item => (
            <div className='keen-slider__slide number-slide1'>
              <a href={item.link}>
                <img src={item.image} alt={item.link} />
              </a>
            </div>
            ))}
          </div>
          {loaded && instanceRef.current && (
            <>
              <Arrow
                left
                onClick={e => e.stopPropagation() || instanceRef.current?.prev()}
                disabled={currentSlide === 0}
              />

              <Arrow
                onClick={e => e.stopPropagation() || instanceRef.current?.next()}
                disabled={currentSlide === instanceRef.current.track.details.slides.length - 1}
              />
            </>
          )}
        </div>
        {loaded && instanceRef.current && (
          <div className='dots'>
            {[...Array(instanceRef.current.track.details.slides.length).keys()].map(idx => {
              return (
                <button
                  key={idx}
                  onClick={() => {
                    instanceRef.current?.moveToIdx(idx);
                  }}
                  className={'dot' + (currentSlide === idx ? ' active' : '')}></button>
              );
            })}
          </div>
        )}
      </>
    );
}

function Arrow(props) {
  const disabeld = props.disabled ? ' arrow--disabled' : '';
  return (
    <svg
      onClick={props.onClick}
      className={`arrow ${props.left ? 'arrow--left' : 'arrow--right'} ${disabeld}`}
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'>
      {props.left && <path d='M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z' />}
      {!props.left && <path d='M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z' />}
    </svg>
  );
}
