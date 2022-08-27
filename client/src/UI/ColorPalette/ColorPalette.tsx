import { useLayoutEffect, useState } from "react";
import AutoWrapper from "../AutoWrapper/AutoWrapper";
import { ReactComponent as CopyIcon } from "../../assets/copy.svg";
import { ReactComponent as CheckIcon } from "../../assets/check.svg";
import { ReactComponent as ColorPickerIcon } from "../../assets/color_picker.svg";
import "./ColorPalette.css";
import { frame_color, getColor, getOpacity, luminance, scheme } from "./color";

const ColorPalette = () => {
  const id = "frame_wrapper_inner_id";
  const getWidth = (): number | null => {
    const frame = document.getElementById(id);
    if (frame) {
      const rect = frame.getBoundingClientRect();
      const height = rect.height;
      const width = rect.width;
      return width;
    } else {
      return null;
    }
  };

  useLayoutEffect(() => {
    const frame = document.getElementById(id);
    if (frame) {
      const rect = frame.getBoundingClientRect();
      const height = rect.height;
      const width = rect.width;
      setFrameDimension({ height, width });
    }
  }, [id]);

  const { array: color_array } = getColor(0, 0);
  const [frameDimension, setFrameDimension] = useState<{
    height: number;
    width: number;
  }>();

  const [colorRGB, setColorRGB] = useState<scheme>(color_array);
  const [rootColor, setRootColor] = useState<scheme>(color_array);
  const [grade, setGrade] = useState(getOpacity(0, 0));
  const [frameCord, setFrameCord] = useState<[number, number]>([
    getWidth() || 0,
    0,
  ]);
  const [moveCircle, setMoveCircle] = useState(false);
  const [gradeCord, setGradeCord] = useState(0);
  const [moveGrade, setMoveGrade] = useState(false);
  const [colorCord, setColorCord] = useState(0);
  const [moveColor, setMoveColor] = useState(false);
  const [copied, setCopied] = useState(false);
  const [timeoutId, setTimeoutId] = useState<number | undefined>();
  const rgb = (color: scheme = colorRGB) => {
    return `rgb(${color.join(`, `)})`;
  };
  const rgba = () => `rgb(${colorRGB.join(`, `)}, ${grade})`;

  return (
    <div className="colorPalette regular_text">
      <div className="color_scheme_wrapper">
        <div className="frame_wrapper flex1">
          <AutoWrapper>
            <div
              id={id}
              className="frame_wrapper_inner"
              style={{ backgroundColor: rgb(rootColor) }}
              onClick={(e) => {
                e.preventDefault();
                const element = e.target as Element;
                const rect = element.getBoundingClientRect();
                const x = rect.x;
                const y = element.getBoundingClientRect().y;
                const X = e.clientX - x;
                const Y = e.clientY - y;
                setFrameCord([X, Y]);
                const { array, root } = frame_color(
                  X,
                  Y,
                  rect.height,
                  rect.width,
                  colorRGB,
                  rootColor
                );
                setRootColor(root);
                setColorRGB(array);
              }}
              onMouseDown={(e) => {
                e.preventDefault();
                const element = e.target as Element;
                const rect = element.getBoundingClientRect();
                const x = rect.x;
                const y = element.getBoundingClientRect().y;
                const X = e.clientX - x;
                const Y = e.clientY - y;
                setFrameCord([X, Y]);
                setMoveCircle(true);
                const { array, root } = frame_color(
                  X,
                  Y,
                  rect.height,
                  rect.width,
                  colorRGB,
                  rootColor
                );
                setRootColor(root);
                setColorRGB(array);
              }}
              onMouseMove={(e) => {
                e.preventDefault();

                if (moveCircle) {
                  const element = e.target as Element;
                  const rect = element.getBoundingClientRect();
                  const x = rect.x;
                  const y = element.getBoundingClientRect().y;
                  const X = e.clientX - x;
                  const Y = e.clientY - y;
                  setFrameCord([X, Y]);
                  const { array, root } = frame_color(
                    X,
                    Y,
                    rect.height,
                    rect.width,
                    colorRGB,
                    rootColor
                  );
                  setRootColor(root);
                  setColorRGB(array);
                } else {
                  return;
                }
              }}
              onMouseUp={() => {
                setMoveCircle(false);
              }}
            >
              <div
                style={{
                  left: frameCord[0] - 4,
                  top: frameCord[1] - 4,
                  borderColor: luminance(colorRGB) ? `#000` : `#fff`,
                }}
                className="pointer circle"
              ></div>
              <div className="bg_frame_white"></div>
              <div className="bg_frame_black"></div>
            </div>
          </AutoWrapper>
        </div>
        <div className="opacity_wrap">
          <div
            style={{ backgroundColor: rgb() }}
            onClick={(e) => {
              e.preventDefault();
              const element = e.target as Element;
              const rect = element.getBoundingClientRect();
              const y = rect.y;
              const Y = e.clientY - y;
              setGradeCord(Y);
              setGrade(getOpacity(Y, rect.height));
            }}
            onMouseDown={(e) => {
              e.preventDefault();
              const element = e.target as Element;
              const rect = element.getBoundingClientRect();
              const y = rect.y;
              const Y = e.clientY - y;
              setGradeCord(Y);
              setMoveGrade(true);
              setGrade(getOpacity(Y, rect.height));
            }}
            onMouseMove={(e) => {
              e.preventDefault();

              if (moveGrade) {
                const element = e.target as Element;
                const rect = element.getBoundingClientRect();
                const y = rect.y;
                const Y = e.clientY - y;
                setGradeCord(Y);
                setGrade(getOpacity(Y, rect.height));
              } else {
                return;
              }
            }}
            onMouseLeave={() => {
              setMoveGrade(false);
            }}
            onMouseUp={() => {
              setMoveGrade(false);
            }}
            className={`inner ${moveGrade ? `grabbing` : ``}`}
          ></div>
          <div style={{ top: gradeCord }} className="bar_wheel"></div>
        </div>
        <div className="grade">
          <div
            onClick={(e) => {
              e.preventDefault();
              const element = e.target as Element;
              const rect = element.getBoundingClientRect();
              const y = rect.y;
              const Y = e.clientY - y;
              setColorCord(Y);
              const { array } = getColor(Y, rect.height);
              const { array: rgb } = frame_color(
                frameCord[0],
                frameCord[1],
                frameDimension?.height || rect.height, // height of this container is equal to height of frame
                frameDimension?.width || rect.height, // frame is a square
                array,
                array
              );
              setRootColor(array);
              setColorRGB(rgb);
            }}
            onMouseDown={(e) => {
              e.preventDefault();
              const element = e.target as Element;
              const rect = element.getBoundingClientRect();
              const y = rect.y;
              const Y = e.clientY - y;
              setColorCord(Y);
              setMoveColor(true);
              const { array } = getColor(Y, rect.height);
              const { array: rgb } = frame_color(
                frameCord[0],
                frameCord[1],
                frameDimension?.height || rect.height, // height of this container is equal to height of frame
                frameDimension?.width || rect.height, // frame is a square
                array,
                array
              );
              setRootColor(array);
              setColorRGB(rgb);
            }}
            onMouseMove={(e) => {
              e.preventDefault();
              if (moveColor) {
                const element = e.target as Element;
                const rect = element.getBoundingClientRect();
                const y = rect.y;
                const Y = e.clientY - y;
                setColorCord(Y);
                const { array } = getColor(Y, rect.height);
                const { array: rgb } = frame_color(
                  frameCord[0],
                  frameCord[1],
                  frameDimension?.height || rect.height, // height of this container is equal to height of frame
                  frameDimension?.width || rect.height, // frame is a square
                  array,
                  array
                );
                setRootColor(array);
                setColorRGB(rgb);
              } else {
                return;
              }
            }}
            onMouseLeave={() => {
              setMoveColor(false);
            }}
            onMouseUp={() => {
              setMoveColor(false);
            }}
            className={`inner ${moveColor ? `grabbing` : ``}`}
          ></div>
          <div style={{ top: colorCord }} className="bar_wheel"></div>
        </div>
      </div>
      <div className="color_scheme_code">
        <div className="plane center">
          <ColorPickerIcon className="img_div_contain" />
        </div>
        <div className="flex1 flex code_value_wrapper">
          <div className="flex1 color_code regular_text">{rgba()}</div>
          <div
            onClick={() => {
              if (timeoutId) {
                clearTimeout(timeoutId);
              }
              setCopied(true);
              const copyTimeout = window.setTimeout(() => {
                setCopied(false);
              }, 3000);
              setTimeoutId(copyTimeout);
            }}
            className="copy_wrap center"
          >
            <div className="inner center">
              {copied ? (
                <CheckIcon className="img_div_contain" />
              ) : (
                <CopyIcon className="img_div_contain" />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="color_scheme_extra scrollWheelSm">
        {Array(20)
          .fill(0)
          .map((num, n) => (
            <AutoWrapper key={n} className="prev_color_wrapper">
              <div
                style={{
                  backgroundColor:
                    n === 0 ? `rgb(${colorRGB.join(`, `)}, ${grade})` : ``,
                }}
                className="prev_color"
                key={n}
              ></div>
            </AutoWrapper>
          ))}
      </div>
    </div>
  );
};

export default ColorPalette;
