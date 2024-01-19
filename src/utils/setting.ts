export const API_URL = process.env.NEXT_PUBLIC_BASE_URL || ""
export const ACCESS_TOKEN = "access_token"
export const TOKEN =  `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWQiOiJkZDhmYWI5MC0wMGYyLTExZWUtYTJkYy1jOWZkNjg5MWM0MTIiLCJuYW1lIjoiQWRtaW4iLCJyb2xlX2NvZGUiOiJzdXBlci1hZG1pbiIsImlhdCI6MTY4OTgzNTUyOCwiZXhwIjoxNjkwNDQwMzI4fQ.ZMMJkb7bWID9gt5uLwJtQKQJ92NzfBciS_PpsfoKbT0`
import { ImageInterface } from "typings";
import _get from "lodash.get";
export const getImageThumbnailUrl = (image: ImageInterface) => { 
    if (_get(image, "thumbnail", null)) {
      return image.thumbnail;
    } else if (_get(image, "small", null)) {
      return image.small;
    } else if (_get(image, "medium", null)) {
      return image.medium;
    } else {
      return image && image.url;
    }
};
export const filter_characters = [
  "All", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M","N", "O", "P", "R", "S", "T", "U", "V","W", "X", "Y", "Z", "123"
]
export const formatCouponDate = (startDateString: string, endDateString: string) => {
    const strArray=['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    if(startDateString && endDateString) {
    let startDate  = new Date(startDateString).getDate();
    let startMonth = new Date(startDateString).getMonth();

    let endDate  = new Date(endDateString).getDate();
    let endMonth = new Date(endDateString).getMonth();
    if(endMonth === startMonth)  return `${startDate}-${endDate} ${strArray[endMonth]}`
    return `${startDate} ${strArray[startMonth]}-${endDate} ${strArray[endMonth]}`
  }
  if(endDateString) {
    let endDate  = new Date(endDateString).getDate();
    let endMonth = new Date(endDateString).getMonth();
    return `${endDate} ${strArray[endMonth]}`
  }
  return ""
}
export const formatDateTime = (dateString: string) => {
  if(dateString) {
    let date = new Date(dateString).getDate();
    let month = new Date(dateString).getMonth() + 1;
    let year = new Date(dateString).getFullYear()
    let hours = new Date(dateString).getHours()
    let minutes = new Date(dateString).getMinutes()
    let seconds = new Date(dateString).getSeconds()
    return `${date}/${month}/${year} ${hours}:${minutes}:${seconds}`
  }
  return ""
}
function capitalize(s: string)
{
    return s && s[0].toUpperCase() + s.slice(1);
}
export const formatCashbackString = (cashback: string) => {
  try {
    if(cashback) {
      cashback = cashback.toLowerCase();
      const cashbackOfString = cashback.indexOf("cashback");
      const onlineOfString = cashback.indexOf("online");
      return {
        cashbackValue: cashbackOfString !== -1 ? capitalize(cashback.slice(0, cashbackOfString)) : onlineOfString!== -1 ? capitalize(cashback.slice(0, onlineOfString)) : cashback,
        specialString: cashbackOfString !== -1 ? "cashback" : onlineOfString!== -1 ? "online" : ""
      }
    }
    return {
      cashbackValue: cashback,
      specialString: ""
    }
  }
  catch(error) {
    return {
      cashbackValue: cashback,
      specialString: ""
    }
  }
}

export const rankingBackgroundColor = [
  "#000",
  "#000",
  "#000",
  "#A5D6A7",
  "#81C784",
  "#98FB98",
  "#66BB6A",
  "#4CAF50",
  "#00BFA5",
  "#009688",
  "#00CED1",
  "#E0FFFF",
  "#00ACC1",
  "#87CEEB",
  "#90CAF9",
  "#64B5F6",
  "#1E90FF",
  "#2196F3",
  "#1976D2",
  "#0000CD",
  "#00008B",
  "#3F51B5",
  "#3949AB",
  "#673AB7",
  "#512DA8",
  "#4527A0",
  "#7E57C2",
  "#9932CC",
  "#FF00FF",
  "#E91E63",
  "#D81B60",
  "#F06292",
  "#FF80AB",
  "#FF69B4",
  "#FF1493",
  "#F44336",
  "#D32F2F",
  "#B22222",
  "#800000",
  "#DC143C",
  "#CD5C5C",
  "#BC8F8F",
  "#F4A460",
  "#FFA07A",
  "#FA8072",
  "#E9967A",
  "#FF6F61",
  "#FF6347",
  "#FF4500",
  "#FFA500",
  "#FF8C00",
  "#FFD700",
  "#FFFFE0",
  "#FFFACD",
  "#EEE8AA",
  "#F0E68C",
  "#FFFF00",
  "#EEDD82",
  "#DAA520",
  "#B8860B",
  "#778899",
  "#708090",
  "#2F4F4F",
  "#696969",
  "#808080",
  "#A9A9A9",
  "#C0C0C0",
  "#D3D3D3",
  "#DCDCDC",
  "#F5F5F5",
  "#FFFAF0",
  "#FFFFF0",
  "#FAF0E6",
  "#FDF5E6",
  "#FAEBD7",
  "#F5F5DC",
  "#FFF5EE",
  "#FFF8DC",
  "#FFFAFA",
  "#FFFFFF",
  "#F8F8FF",
  "#F5FFFA",
  "#F0FFF0",
  "#F0FFFF",
  "#F0F8FF",
  "#E6E6FA",
  "#FFF0F5",
  "#FFE4E1",
  "#FFFFF0",
  "#FFFFFF",
  "#F5F5F5",
  "#DCDCDC",
  "#D3D3D3",
  "#C0C0C0",
  "#A9A9A9",
  "#808080",
  "#696969",
  "#708090",
  "#2F4F4F",
  "#000000", 
]
export const rankFontColor =  [
  // 0- 10
"#FFFFFF",
"#FFFFFF",
"#FFFFFF",
"#FFFFFF",
"#FFFFFF",
"#FFFFFF",
"#FFFFFF",
"#FFFFFF",
"#FFFFFF",
"#FFFFFF",
"#FFFFFF",

// 10 -20
"#000000",
"#000000",
"#000000",
"#000000",
"#000000",
"#FFFFFF",
"#FFFFFF",
"#FFFFFF",
"#FFFFFF",
"#FFFFFF",

// 20 -30
"#FFFFFF",
"#FFFFFF",
"#FFFFFF",
"#FFFFFF",
"#FFFFFF",
"#FFFFFF",
"#FFFFFF",
"#FFFFFF",
"#FFFFFF",
"#FFFFFF",

// 30 -40
"#FFFFFF",
"#FFFFFF",
"#FFFFFF",
"#FFFFFF",
"#FFFFFF",
"#FFFFFF",
"#FFFFFF",
"#FFFFFF",
"#FFFFFF",
"#FFFFFF",

// 40 -50
"#FFFFFF",
"#FFFFFF",
"#FFFFFF",
"#FFFFFF",
"#FFFFFF",
"#FFFFFF",
"#FFFFFF",
"#FFFFFF",
"#FFFFFF",
"#FFFFFF",

// 50 -60
"#FFFFFF",
"#000000",
"#000000",
"#000000",
"#000000",
"#000000",
"#000000",
"#FFFFFF",
"#FFFFFF",
"#FFFFFF",

// 60 -70
"#FFFFFF",
"#FFFFFF",
"#FFFFFF",
"#FFFFFF",
"#000000",
"#000000",
"#FFFFFF",
"#000000",
"#000000",
"#000000",

// 70 -80
"#000000",
"#000000",
"#000000",
"#000000",
"#000000",
"#000000",
"#000000",
"#000000",
"#000000",
"#FFFFF",

// 80 -90
"#000000",
"#000000",
"#000000",
"#000000",
"#000000",
"#000000",
"#000000",
"#000000",
"#000000",
"#000000",

// 90 -100
"#000000",
"#000000",
"#000000",
"#FFFFFF",
"#FFFFFF",
"#FFFFFF",
"#FFFFFF",
"#FFFFFF",
"#FFFFFF",
"#FFFFFF",
]
export const ordinalFormOfNumbers = [
    "0",
    "1st",
    "2nd",
    "3rd",
    "4th",
    "5th",
    "6th",
    "7th",
    "8th",
    "9th",
    "10th",
    "11th",
    "12th",
    "13th",
    "14th",
    "15th",
    "16th",
    "17th",
    "18th",
    "19th",
    "20th",
    "21st",
    "22nd",
    "23rd",
    "24th",
    "25th",
    "26th",
    "27th",
    "28th",
    "29th",
    "30th",
    "31st",
    "32nd",
    "33rd",
    "34th",
    "35th",
    "36th",
    "37th",
    "38th",
    "39th",
    "40th",
    "41st",
    "42nd",
    "43rd",
    "44th",
    "45th",
    "46th",
    "47th",
    "48th",
    "49th",
    "50th",
    "51st",
    "52nd",
    "53rd",
    "54th",
    "55th",
    "56th",
    "57th",
    "58th",
    "59th",
    "60th",
    "61st",
    "62nd",
    "63rd",
    "64th",
    "65th",
    "66th",
    "67th",
    "68th",
    "69th",
    "70th",
    "71st",
    "72nd",
    "73rd",
    "74th",
    "75th",
    "76th",
    "77th",
    "78th",
    "79th",
    "80th",
    "81st",
    "82nd",
    "83rd",
    "84th",
    "85th",
    "86th",
    "87th",
    "88th",
    "89th",
    "90th",
    "91st",
    "92nd",
    "93rd",
    "94th",
    "95th",
    "96th",
    "97th",
    "98th",
    "99th",
    "100th"
 
]