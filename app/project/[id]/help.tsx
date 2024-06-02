import WordIcon from "@/public/icons/word.png";
import ExcelIcon from "@/public/icons/excel.png";
import PptIcon from "@/public/icons/ppt.png";
import PdfIcon from "@/public/icons/pdf-plain.png";
import VideoIcon from "@/public/icons/video.png";
import AudioIcon from "@/public/icons/audio.png";
import { StaticImageData } from "next/image";

export const FileIconMap: Record<string, StaticImageData> = {
  "application/msword": WordIcon,
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": WordIcon,
  "application/vnd.ms-excel": ExcelIcon,
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": ExcelIcon,
  "application/vnd.ms-powerpoint": PptIcon,
  "application/vnd.openxmlformats-officedocument.presentationml.presentation": PptIcon,
  "application/pdf": PdfIcon,
  "video/mp4": VideoIcon,
  "audio/mpeg": AudioIcon,
};