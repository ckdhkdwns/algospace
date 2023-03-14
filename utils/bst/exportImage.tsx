import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';
import { RefObject } from 'react';

export default function exportImage (name: string | undefined , extension: string, boardRef: RefObject<HTMLDivElement>) {
    if(typeof name == undefined) return;
    if(!boardRef) return; 
    const img = boardRef.current?.childNodes[0];
    
    console.log(img);
    if (!img) return;
    function filter(node: any) {
      return node.tagName !== "i";
    }

    if (extension == "SVG") {
      domtoimage.toSvg(img, { filter: filter }).then(function (dataUrl) {
        const link = document.createElement("a");
        link.download = `${name}.svg`;
        link.href = dataUrl;
        link.click();
      });
    }
    if (extension == "PNG") {
      domtoimage.toBlob(img).then(function (blob) {
        saveAs(blob, `${name}.png`);
      });
    }
    if (extension == "JPEG") {
      domtoimage.toJpeg(img, { quality: 1 }).then(function (dataUrl) {
        var link = document.createElement("a");
        link.download = `${name}.jpeg`;
        link.href = dataUrl;
        link.click();
      });
    }
  };