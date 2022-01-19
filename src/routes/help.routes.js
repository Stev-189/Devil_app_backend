import { Router } from "express";
const router = Router();

router.get('/api/*',(req,res)=>{res.status(500).json({
  result: false,
  message: 'Route not found'
})})
router.post('api/*',(req,res)=>{res.status(500).json({
  result: false,
  message: 'Route not found'
})})

router.put('api/*',(req,res)=>{res.status(500).json({
  result: false,
  message: 'Route not found'
})}) 

router.delete('api/*',(req,res)=>{res.status(500).json({
  result: false,
  message: 'Route not found'
})})  

export default router;