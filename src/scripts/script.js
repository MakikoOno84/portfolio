// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

// export const swiper = new Swiper('.swiper', {
//   pagination: {
//     el: '.swiper-pagination',
//     type: 'progressbar',
//   },
//   navigation: {
//     nextEl: '.swiper-button-next',
//     prevEl: '.swiper-button-prev',
//   },
// });

// const featuredImage = ( featuredImageObject ) => {
//   let imgWidth = featuredImageObject.media_details.sizes.full.width;
//   let imgHeight = featuredImageObject.media_details.sizes.full.height;
//   let img = `<img src="${featuredImageObject.media_details.sizes.full.source_url}" 
//       width="${imgWidth}"
//       height="${imgHeight}"
//       alt="${featuredImageObject.alt_text}"
//       srcset="${featuredImageObject.media_details.sizes.full.source_url} ${imgWidth}w, 
//       ${featuredImageObject.media_details.sizes.large.source_url} 1024w,
//       ${featuredImageObject.media_details.sizes.medium_large.source_url} 768w,
//       ${featuredImageObject.media_details.sizes.medium.source_url} 300w"
//       sizes="(max-width: ${imgWidth}) 100vw, ${imgWidth}px">`;
//   return {__html: img}
// }

const featuredImage = ( featuredImageObject ) => {
  let imgWidth = featuredImageObject.media_details.sizes.full.width;
  let imgHeight = featuredImageObject.media_details.sizes.full.height;
  let img = `<img src="${featuredImageObject.media_details.sizes.full.source_url}" 
      width="${imgWidth}"
      height="${imgHeight}"
      alt="${featuredImageObject.alt_text}"
      srcset="${featuredImageObject.media_details.sizes.full.source_url} ${imgWidth}w, 
      ${featuredImageObject.media_details.sizes.large.source_url} 1024w,
      ${featuredImageObject.media_details.sizes.medium_large.source_url} 768w,
      ${featuredImageObject.media_details.sizes.medium.source_url} 300w"
      sizes="(max-width: 700px) 100vw,
       1024px">`;// break point about at 700px with full width and image width is relatively small above 700px thus fallback is set as 1024px 
      //  reference: https://qiita.com/dowanna6/items/b9e132b4c56e67491027
      // https://medium.com/@woutervanderzee/responsive-images-with-srcset-and-sizes-fc434845e948
  return {__html: img}
}

export {featuredImage}