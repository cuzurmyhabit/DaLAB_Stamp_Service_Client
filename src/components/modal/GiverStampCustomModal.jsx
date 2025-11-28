import { useEffect, useState } from "react"
import supabase from "../../lib/supabase"

export default function GiverStampCustomModal(){
  const [stampBorderData, setStampBorderData] = useState([])
  const [stampShapeData, setStampShapeData] = useState([])
  const [selectBorderPath, setSelectBorderPath] = useState("../assets/stamp/border/circle.svg")
  const [selectShapePath, setSelectShapePath] = useState(null)

  useEffect(()=>{
    async function fetchStamp(){
      const {data : fetchStampBorder, error : error1} = await supabase.from("stamp_border").select("*");
      const {data:fetchStampShape, error : error2} = await supabase.from("stamp_shape").select("*");

      if(error1||error2){
        console.error("스탬프 페이지 기본 데이터 불러오기 오류:", borderError || shapeError);
        return;
      }
      setStampBorderData(fetchStampBorder);
      setStampShapeData(fetchStampShape);
    }
    fetchStamp();
  },[])

  return(
    <div className="flex flex-col">
      <div>도장 커스텀</div>
      <div className="flex flex-row g-5">
        <div className="relative flex flex-col">
          <div>미리보기</div>
          <div className="mt-10 flex justify-center">
            <object
              data={selectBorderPath}
              type="image/svg+xml"
              className="w-250 h-250"
            />
            {selectShapePath ? <object data={selectShapePath} type="image/svg+xml" className="x-100 y-100"/> : null} 
          </div>
          <button className="absolute right-0 bg-blue-400 text-white rounded-lg px-25 py-10" type="submit">추가하기</button>
        </div>      
        <div className="flex flex-col ">
          <div>
            <div className="text-[20px]">테두리</div>
            <div className='flex flex-row'>{
              stampBorderData.map((v)=>(
                <div 
                  key={v.stamp_id} 
                  className={`inline-block p-2 overflow-x-scroll w-full`}
                  onClick={()=>setSelectBorderPath(v.image_path)}
                  >
                  <object data="image/svg+xml" type={v.image_path}/>
                </div>
              ))
            }</div>
          </div>
          <div>
            <div className="text-[20px]">도형선택</div>
            <div className="flex flex-row">{
              stampShapeData.map((v) => (
                <div 
                  key={v.id}
                  className="inline-block p2 overflow-x-scroll"
                  onClick={()=>setSelectShapePath(v.image_path)}
                  >
                  <object data="image/svg+xml" type={v.image_path}/>
                </div>
              ))  
            }</div>
          </div>
        </div>
      </div>
    </div>
  )
} 