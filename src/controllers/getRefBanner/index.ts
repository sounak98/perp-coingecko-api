import sharp from "sharp";
import QRCode from "qrcode";
import rect from "./rect";
import square from "./square";

const getRefBanner = async (req, res, next) => {
  const shape: string = req.query.shape || "square";
  const refCode: string = req.query.refCode;
  const QrPngString = await QRCode.toDataURL(
    `https://perp.exchange/ref/${refCode}`
  );

  const data = {
    refCode,
    QrPngString,
  };

  let template = square;
  if (shape === "rect") {
    template = rect;
  }

  const resultSvg = template(data);
  // const resultPng = await sharp(Buffer.from(resultSvg))
  //   .toFormat("png")
  //   .toBuffer();

  res.set("Content-Type", "image/svg+xml");
  res.send("<html>" + resultSvg + "</html>");
};

export default getRefBanner;
