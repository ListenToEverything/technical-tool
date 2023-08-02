import html2canvas from 'html2canvas'
import JsPDF from 'jspdf'

export const downloadPDF = page => {
  html2canvas(page).then(function (canvas) {
    canvas2PDF(canvas)
  })
}

const canvas2PDF = canvas => {
  const contentWidth = canvas.width
  const contentHeight = canvas.height

  // a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
  const imgWidth = 595.28
  const imgHeight = 592.28 / contentWidth * contentHeight

  // 第一个参数： l：横向  p：纵向
  // 第二个参数：测量单位（"pt"，"mm", "cm", "m", "in" or "px"）
  const pdf = new JsPDF('p', 'pt')

  pdf.addImage(
    canvas.toDataURL('image/jpeg', 1.0),
    'JPEG',
    0,
    0,
    imgWidth,
    imgHeight
  )

  pdf.save('导出.pdf')
}
