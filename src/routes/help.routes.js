import { Router } from "express";
const router = Router();

router.get('*',(req,res)=>{res.status(500).json({
  result: false,
  message: 'Route not found'
})})
router.post('*',(req,res)=>{res.status(500).json({
  result: false,
  message: 'Route not found'
})})

router.put('*',(req,res)=>{res.status(500).json({
  result: false,
  message: 'Route not found'
})}) 

router.delete('*',(req,res)=>{res.status(500).json({
  result: false,
  message: 'Route not found'
})})  

export default router;