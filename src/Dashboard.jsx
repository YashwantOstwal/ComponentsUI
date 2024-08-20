import { useRef,useState,useCallback,useEffect,memo } from 'react'
import {motion, useScroll, useTransform,useInView} from 'framer-motion'
import heroImage from './assets/heroImage.png'
import RightIcon from './RightIcon.jsx'

function Dashboard() {
  const targetRef = useRef(null);
  const {scrollYProgress} = useScroll({
    target:targetRef,
    offset:['start start','end end']
  })
  const rotateX = useTransform(scrollYProgress,[0,1],['0deg','-50deg'])
  const top = useTransform(scrollYProgress,[0,1],['10%','0%'])
  return (
    <div ref = {targetRef}>
      <div style = {{perspective:1500}} className = 'h-screen flex justify-center bg-white'>
        <motion.div 
          className = 'w-3/4 fixed origin-top'
          initial = {{rotateX:'-45deg'}}
          animate = {{rotateX:'0deg',transition:{delay:0.5,duration:0.3}}}
          style = {{rotateX,top}}
        >
          <img src={heroImage} alt="heroImage" />
          <div className = 'absolute inset-0'>
            <div className = 'flex justify-between px-[2%] h-[5%]'>
              <MenuBar />
            </div>
            <div className = 'grid grid-cols-2 h-[93%]'>
              <div className = 'flex flex-col justify-center space-y-[5%] items-center m-[10%] poppins-medium'>
                <motion.a
                  href = '/'
                  className = 'flex gap-2 text-[1.1vw] items-center text-white bg-[#7053FF] px-3 rounded-full leading-loose'
                  whileHover = {{gap:'16px'}}
                 >
                  $7.5M seed raised with Accent & Square Peg
                  <RightIcon />
                </motion.a>
                <p className = 'text-[4vw] text-white leading-tight'>
                  {'Impactful stories. Made effortlessly'.split('').map((character,index)=>{
                    return (
                      <motion.span 
                        initial = {{opacity:0}}
                        animate = {{opacity:1}}
                        transition = {{delay:1+index*0.05}}
                      >{character}
                      </motion.span>
                    )
                  })}
                </p>
                <motion.p className = 'text-[#727173] text-[1.3vw] p-2'
                  initial = {{scale:1.2,opacity:0}}
                  animate = {{scale:1,opacity:1}}
                  transition = {{delay:2,duration:0.2}}
                >
                    Chronicle is a modern format of presentations. Deliver impressive. Interactive stories without the design guesswork.
                </motion.p>
              </div>
              <div className = 'flex justify-center items-center'>
                <div className = 'w-[70%] aspect-square bg-red-300 rounded-md grid grid-cols-3'>
                  <div className = ''></div>
                  <div className = 'col-span-2'></div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      <div className = 'h-[200px] bg-white'></div>
    </div>
  )
}
function MenuBar(){
  return (
  <>
    <div className = ' relative flex gap-2 items-center'>
      <div className = 'h-1/2 aspect-square border border-white/30 rounded-full'></div>
      <div className = 'h-1/2 aspect-square border border-white/30 rounded-full'></div>
      <div className = 'h-1/2 aspect-square border border-white/30 rounded-full'></div>
      <motion.div 
        className = 'absolute inset-0 flex gap-2 items-center'
        initial = {{opacity:0}}
        whileHover = {{opacity:1}}
      >
          <div className = 'h-1/2 aspect-square rounded-full bg-[#F36C5F]' />
          <div className = 'h-1/2 aspect-square rounded-full bg-[#F8BD4D]' />
          <div className = 'h-1/2 aspect-square rounded-full bg-[#53C14F]' />
      </motion.div>
    </div>
  </>
  )
}
function RadioFamily(){
  const targetRef = useRef(null)
  const [unclicked,setUnclicked]  = useState(false);
  const [cardId,setCardId] = useState(0);
  const isInView = useInView(targetRef) && unclicked;

  useEffect(()=>{
      isInView? (
          controlInterval = setInterval(()=>{
              setCardId((prevState)=>`${(prevState+1)%3 }`);
          },2200)
      ):(
          clearInterval(controlInterval)
          
      );
  },[isInView]);

  const handleChange = useCallback((value)=>{
      setUnclicked(false);
      setCardId(value);
  });

  return (
    <div>
      <RadioButton value = '0' handleChange = {handleChange} cardId = {cardId} setCardId = {setCardId}>Yash</RadioButton>
      <RadioButton value = '1' handleChange = {handleChange} cardId = {cardId} setCardId = {setCardId}>Jittu</RadioButton>
    </div>
  )
}
const RadioButton = memo((props)=>{

  return (
  <div className = 'flex gap-2 justify-center rounded-2xl'>
      <input id = {value} className = 'w-5 accent-[#C1ED42]' type="radio" checked = {cardId === value} onChange = {(e)=>{handleChange(e.target.value)}}/>
      <label htmlFor = {value} className = 'w-20  flex flex-col justify-center'  >{name}</label>
  </div>
  );
});
export default Dashboard;
