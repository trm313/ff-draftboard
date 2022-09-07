// PLAYER STYLES
import { TbCircleDotted } from "react-icons/tb";
import { HiHeart, HiOutlineHeart } from "react-icons/hi";
import {
  RiThumbDownFill,
  RiThumbDownLine,
  RiUserShared2Line,
  RiUserShared2Fill,
} from "react-icons/ri";
import { BsSquare, BsCheck2Square } from "react-icons/bs";

export const styles = {
  opacity: {
    drafted: 0.1,
  },
  card: {
    bg: {
      default: "white",
      drafted: "gray.200",
      liked: "red.200",
      avoided: "blue.200",
    },
    color: {
      default: "gray.800",
      drafted: "gray.400",
    },
  },
  position: {
    bg: {
      drafted: "gray.300",
      RB: "blue.600",
      WR: "green.600",
      TE: "orange.600",
      QB: "red.600",
      DST: "blue.800",
      K: "pink.600",
    },
    color: {
      drafted: "gray.400",
      default: "white",
    },
  },
};

export const icons = {
  liked: {
    active: HiHeart,
    inactive: HiOutlineHeart,
    color: "red.600",
  },
  avoided: {
    active: RiThumbDownFill,
    inactive: RiThumbDownLine,
    color: "blue.600",
  },
  drafted: {
    active: TbCircleDotted,
    inactive: TbCircleDotted,
    color: "gray.400",
  },
  // Remove above
  like: {
    active: HiHeart,
    inactive: HiOutlineHeart,
    color: "red.600",
  },
  avoid: {
    active: RiThumbDownFill,
    inactive: RiThumbDownLine,
    color: "blue.600",
  },
  draft: {
    active: BsCheck2Square,
    inactive: BsSquare,
    color: "gray.400",
  },
  keeper: {
    active: RiUserShared2Fill,
    inactive: RiUserShared2Line,
    color: "green.600",
  },
};
