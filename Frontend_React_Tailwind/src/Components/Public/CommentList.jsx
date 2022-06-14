import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';


export default function CommentList() {
  const [listBinhLuan, setListBinhLuan] = useState([]);
  const [state, setState] = useState(false);
  let { id } = useParams();
  useEffect(() => {
    axios
      .get(`https://localhost:7216/api/TrangChiTietSanPham/ListBinhLuanSanPham?id=${id}`)
      .then(res => {
        console.log('%cThis is a green text', 'color:green');
        setListBinhLuan(res.data);
        setState(true);
      })
      .catch(err => {
        console.log('%cThis is a red text', 'color:red');
      });
  }, []);
  const renderData = () => {
    console.log(listBinhLuan);
    if (state === true) {
      return (
        <div>
          {listBinhLuan.map(item => (
            <div className='div'>
              <p>{item.tenKhachHang}</p>
              <p>{item.noiDung}</p>
            </div>
          ))}
        </div>
      );
    } else return <>No data</>;
  };

  return (
    // renderData()
    <div className='container max-w-[1920px] p-20  m-auto h-[1200px]'>
      <div className='justify-between'>
        <div className="flex justify-between space-y-5 mb-16">
          <div className='title-left '>
            <h1 className='text-3xl leading-6 font-semibold'>Our customer feedback </h1>
            <p className='text-lg font-normal'>Don't take our word for it. Trust our customers</p>
          </div>
          <div className='title-right flex gap-3'>
            <a href="#">
              <div className="button border-2 border-gray-400 p-2 rounded-2xl text-base">Previous</div>
            </a>
            <a href="#">
              <div className="button border-2 border-gray-400 p-2 rounded-2xl text-base">Next</div>
            </a>
          </div>
        </div>
        <div className='comment-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-5'>
          <div className='comment-card border-2 border-gray-300  max-h-[283px] p-6 overflow-auto space-y-6'>
            <div className='avatar rounded-full border-4 w-[60px] h-[60px] bg-gradient-to-t'>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0BaxevbHsera-I9b57I40phEGm3caprMeLA&usqp=CAU" alt="" />
            </div>
            <div className='customer-name'>
              <h2 className='text-2xl font-bold'>Floyd Miles</h2>
            </div>
            <div className='content'>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam ut aperiam optio, ea nisi labore? Non
              repudiandae, eum, natus voluptas omnis fugiat unde, illo sapiente obcaecati voluptatum nihil quasi optio.
              Voluptas, magni facere cupiditate eum aperiam exercitationem enim blanditiis velit vero, id illum, optio
              praesentium neque possimus. Ea, nesciunt eius. Repellendus voluptate, reprehenderit perferendis dicta in
              nulla quia quo adipisci? Perferendis ducimus illo at, sequi ad magnam praesentium est maxime laboriosam
              alias corporis necessitatibus, repellendus aperiam facere distinctio, doloribus atque. Repellat saepe ab
              sunt animi atque. Omnis sequi explicabo dignissimos. Vel odit ipsa labore illum placeat accusantium
              asperiores sequi minima, nesciunt natus nostrum, illo deserunt at doloribus eligendi, dicta quidem
              delectus? Similique praesentium, ducimus inventore aliquid quia necessitatibus nulla eum? Ipsam cum
              facilis, earum fugit tempore eveniet accusantium inventore ex veniam obcaecati, error autem nesciunt. Sunt
              molestias beatae reiciendis nulla distinctio voluptas fugiat, commodi, voluptatibus totam, accusantium
              blanditiis nostrum iusto! In porro maxime quia amet asperiores sit aspernatur iusto itaque doloribus
              dolore unde sequi voluptatibus aut impedit ad est minus magni perspiciatis similique illo, blanditiis
              nisi. Modi nulla assumenda perspiciatis. Iure sequi, consequatur nostrum deserunt hic earum, et magnam
              ipsam iusto ullam pariatur tenetur incidunt eligendi voluptatum necessitatibus. Possimus aliquam porro
              blanditiis ad, vero enim labore similique magni cupiditate doloribus. Assumenda eaque suscipit, qui odio
              ipsam cum aspernatur, saepe perspiciatis eligendi aliquid rem cumque dignissimos dolore consequatur quidem
              laudantium dolorem. Ducimus, officiis velit cumque qui soluta rem incidunt omnis autem? Autem velit quam,
              facilis nemo laboriosam tempore facere ipsum reprehenderit qui officia repellendus quasi quo mollitia?
              Deleniti eveniet quidem iure accusamus praesentium quaerat fuga error unde, eligendi debitis magni
              incidunt? Accusantium voluptates voluptas architecto cupiditate sit atque maiores, explicabo praesentium
              ratione voluptatum. Corporis, assumenda ipsum. Totam odit temporibus quos excepturi at consequatur, vel
              quidem nulla, ex voluptatibus nisi, magni pariatur! Ipsum recusandae corrupti provident accusamus quisquam
              sit quibusdam? Expedita, ea sunt? Cumque natus molestiae facilis autem aliquam pariatur id aspernatur
              blanditiis libero. Reprehenderit illum accusamus dignissimos in dolores minima voluptatem? Corrupti fugit,
              in minus et eius nesciunt cupiditate assumenda voluptate nisi voluptatum veniam non expedita quod
              reprehenderit id magnam deleniti nostrum. Accusantium, inventore doloremque. Quibusdam facere fugit natus
              officia nemo. Illum, quo nisi! Animi alias officiis in corrupti numquam laboriosam reprehenderit molestias
              nam quasi officia dicta dignissimos dolore quo expedita, atque id corporis saepe quas rerum neque fugiat?
              Voluptate, iure? Quaerat, porro! Ipsum, facilis? Quisquam autem ex fugiat explicabo totam inventore quas
              natus fuga quos eligendi nihil, consequatur aut suscipit molestiae ab accusantium sapiente vero maxime
              consequuntur atque earum delectus. Natus architecto quibusdam nobis officia voluptate consequuntur eius
              sequi dolore doloremque maiores quaerat at dolorum enim in totam accusamus odio autem ducimus
              reprehenderit, consequatur blanditiis recusandae cum? Nisi, molestias optio. Optio eaque maiores delectus
              cumque fugiat, nesciunt reprehenderit dolorem. Illo accusamus alias sit, id laboriosam ipsum. Laboriosam
              tenetur debitis delectus, earum quibusdam aperiam alias iste nisi consequatur, architecto maxime autem.
              Laboriosam nulla voluptatibus magni fuga ratione exercitationem labore voluptatem aperiam cupiditate
              officiis dolores laudantium dolorum a maiores dolore magnam, earum culpa consectetur temporibus ea numquam
              rem vel. Deleniti, facilis dignissimos! Amet blanditiis quod nobis animi aperiam accusamus mollitia
              praesentium laborum, saepe quo! Officiis incidunt dolorum sint dolore quisquam? Veniam natus, illum vel
              error quia laudantium iusto maxime laborum quaerat! Perspiciatis? Incidunt magnam dolore quaerat eaque
              necessitatibus autem quam, perspiciatis magni accusamus! Eos architecto nesciunt corporis debitis ullam
              hic. Ut eligendi modi dignissimos non, doloremque iure? Quia aliquam a deleniti magnam? Nihil eos, sint
              molestiae dolor nemo consectetur eaque explicabo fuga earum iure quia sed illum nam id ab sit quae officia
              unde nulla est temporibus error. Quasi consequuntur natus rerum!
            </div>
          </div>
          <div className='comment-card border-2 border-gray-300 max-h-[283px]   p-6 overflow-auto space-y-6'>
            <div className='avatar rounded-full border-4 w-[60px] h-[60px] bg-gradient-to-t'>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0BaxevbHsera-I9b57I40phEGm3caprMeLA&usqp=CAU" alt="" />
            </div>
            <div className='customer-name'>
              <h2 className='text-2xl font-bold'>Floyd Miles</h2>
            </div>
            <div className='content'>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam ut aperiam optio, ea nisi labore? Non
              repudiandae, eum, natus voluptas omnis fugiat unde, illo sapiente obcaecati voluptatum nihil quasi optio.
              Voluptas, magni facere cupiditate eum aperiam exercitationem enim blanditiis velit vero, id illum, optio
              praesentium neque possimus. Ea, nesciunt eius. Repellendus voluptate, reprehenderit perferendis dicta in
              nulla quia quo adipisci? Perferendis ducimus illo at, sequi ad magnam praesentium est maxime laboriosam
              alias corporis necessitatibus, repellendus aperiam facere distinctio, doloribus atque. Repellat saepe ab
              sunt animi atque. Omnis sequi explicabo dignissimos. Vel odit ipsa labore illum placeat accusantium
              asperiores sequi minima, nesciunt natus nostrum, illo deserunt at doloribus eligendi, dicta quidem
              delectus? Similique praesentium, ducimus inventore aliquid quia necessitatibus nulla eum? Ipsam cum
              facilis, earum fugit tempore eveniet accusantium inventore ex veniam obcaecati, error autem nesciunt. Sunt
              molestias beatae reiciendis nulla distinctio voluptas fugiat, commodi, voluptatibus totam, accusantium
              blanditiis nostrum iusto! In porro maxime quia amet asperiores sit aspernatur iusto itaque doloribus
              dolore unde sequi voluptatibus aut impedit ad est minus magni perspiciatis similique illo, blanditiis
              nisi. Modi nulla assumenda perspiciatis. Iure sequi, consequatur nostrum deserunt hic earum, et magnam
              ipsam iusto ullam pariatur tenetur incidunt eligendi voluptatum necessitatibus. Possimus aliquam porro
              blanditiis ad, vero enim labore similique magni cupiditate doloribus. Assumenda eaque suscipit, qui odio
              ipsam cum aspernatur, saepe perspiciatis eligendi aliquid rem cumque dignissimos dolore consequatur quidem
              laudantium dolorem. Ducimus, officiis velit cumque qui soluta rem incidunt omnis autem? Autem velit quam,
              facilis nemo laboriosam tempore facere ipsum reprehenderit qui officia repellendus quasi quo mollitia?
              Deleniti eveniet quidem iure accusamus praesentium quaerat fuga error unde, eligendi debitis magni
              incidunt? Accusantium voluptates voluptas architecto cupiditate sit atque maiores, explicabo praesentium
              ratione voluptatum. Corporis, assumenda ipsum. Totam odit temporibus quos excepturi at consequatur, vel
              quidem nulla, ex voluptatibus nisi, magni pariatur! Ipsum recusandae corrupti provident accusamus quisquam
              sit quibusdam? Expedita, ea sunt? Cumque natus molestiae facilis autem aliquam pariatur id aspernatur
              blanditiis libero. Reprehenderit illum accusamus dignissimos in dolores minima voluptatem? Corrupti fugit,
              in minus et eius nesciunt cupiditate assumenda voluptate nisi voluptatum veniam non expedita quod
              reprehenderit id magnam deleniti nostrum. Accusantium, inventore doloremque. Quibusdam facere fugit natus
              officia nemo. Illum, quo nisi! Animi alias officiis in corrupti numquam laboriosam reprehenderit molestias
              nam quasi officia dicta dignissimos dolore quo expedita, atque id corporis saepe quas rerum neque fugiat?
              Voluptate, iure? Quaerat, porro! Ipsum, facilis? Quisquam autem ex fugiat explicabo totam inventore quas
              natus fuga quos eligendi nihil, consequatur aut suscipit molestiae ab accusantium sapiente vero maxime
              consequuntur atque earum delectus. Natus architecto quibusdam nobis officia voluptate consequuntur eius
              sequi dolore doloremque maiores quaerat at dolorum enim in totam accusamus odio autem ducimus
              reprehenderit, consequatur blanditiis recusandae cum? Nisi, molestias optio. Optio eaque maiores delectus
              cumque fugiat, nesciunt reprehenderit dolorem. Illo accusamus alias sit, id laboriosam ipsum. Laboriosam
              tenetur debitis delectus, earum quibusdam aperiam alias iste nisi consequatur, architecto maxime autem.
              Laboriosam nulla voluptatibus magni fuga ratione exercitationem labore voluptatem aperiam cupiditate
              officiis dolores laudantium dolorum a maiores dolore magnam, earum culpa consectetur temporibus ea numquam
              rem vel. Deleniti, facilis dignissimos! Amet blanditiis quod nobis animi aperiam accusamus mollitia
              praesentium laborum, saepe quo! Officiis incidunt dolorum sint dolore quisquam? Veniam natus, illum vel
              error quia laudantium iusto maxime laborum quaerat! Perspiciatis? Incidunt magnam dolore quaerat eaque
              necessitatibus autem quam, perspiciatis magni accusamus! Eos architecto nesciunt corporis debitis ullam
              hic. Ut eligendi modi dignissimos non, doloremque iure? Quia aliquam a deleniti magnam? Nihil eos, sint
              molestiae dolor nemo consectetur eaque explicabo fuga earum iure quia sed illum nam id ab sit quae officia
              unde nulla est temporibus error. Quasi consequuntur natus rerum!
            </div>
          </div>
          <div className='comment-card border-2 border-gray-300  max-h-[283px]  p-6 overflow-auto space-y-6'>
            <div className='avatar rounded-full border-4 w-[60px] h-[60px] bg-gradient-to-t'>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0BaxevbHsera-I9b57I40phEGm3caprMeLA&usqp=CAU" alt="" />
            </div>
            <div className='customer-name'>
              <h2 className='text-2xl font-bold'>Floyd Miles</h2>
            </div>
            <div className='content'>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam ut aperiam optio, ea nisi labore? Non
              repudiandae, eum, natus voluptas omnis fugiat unde, illo sapiente obcaecati voluptatum nihil quasi optio.
              Voluptas, magni facere cupiditate eum aperiam exercitationem enim blanditiis velit vero, id illum, optio
              praesentium neque possimus. Ea, nesciunt eius. Repellendus voluptate, reprehenderit perferendis dicta in
              nulla quia quo adipisci? Perferendis ducimus illo at, sequi ad magnam praesentium est maxime laboriosam
              alias corporis necessitatibus, repellendus aperiam facere distinctio, doloribus atque. Repellat saepe ab
              sunt animi atque. Omnis sequi explicabo dignissimos. Vel odit ipsa labore illum placeat accusantium
              asperiores sequi minima, nesciunt natus nostrum, illo deserunt at doloribus eligendi, dicta quidem
              delectus? Similique praesentium, ducimus inventore aliquid quia necessitatibus nulla eum? Ipsam cum
              facilis, earum fugit tempore eveniet accusantium inventore ex veniam obcaecati, error autem nesciunt. Sunt
              molestias beatae reiciendis nulla distinctio voluptas fugiat, commodi, voluptatibus totam, accusantium
              blanditiis nostrum iusto! In porro maxime quia amet asperiores sit aspernatur iusto itaque doloribus
              dolore unde sequi voluptatibus aut impedit ad est minus magni perspiciatis similique illo, blanditiis
              nisi. Modi nulla assumenda perspiciatis. Iure sequi, consequatur nostrum deserunt hic earum, et magnam
              ipsam iusto ullam pariatur tenetur incidunt eligendi voluptatum necessitatibus. Possimus aliquam porro
              blanditiis ad, vero enim labore similique magni cupiditate doloribus. Assumenda eaque suscipit, qui odio
              ipsam cum aspernatur, saepe perspiciatis eligendi aliquid rem cumque dignissimos dolore consequatur quidem
              laudantium dolorem. Ducimus, officiis velit cumque qui soluta rem incidunt omnis autem? Autem velit quam,
              facilis nemo laboriosam tempore facere ipsum reprehenderit qui officia repellendus quasi quo mollitia?
              Deleniti eveniet quidem iure accusamus praesentium quaerat fuga error unde, eligendi debitis magni
              incidunt? Accusantium voluptates voluptas architecto cupiditate sit atque maiores, explicabo praesentium
              ratione voluptatum. Corporis, assumenda ipsum. Totam odit temporibus quos excepturi at consequatur, vel
              quidem nulla, ex voluptatibus nisi, magni pariatur! Ipsum recusandae corrupti provident accusamus quisquam
              sit quibusdam? Expedita, ea sunt? Cumque natus molestiae facilis autem aliquam pariatur id aspernatur
              blanditiis libero. Reprehenderit illum accusamus dignissimos in dolores minima voluptatem? Corrupti fugit,
              in minus et eius nesciunt cupiditate assumenda voluptate nisi voluptatum veniam non expedita quod
              reprehenderit id magnam deleniti nostrum. Accusantium, inventore doloremque. Quibusdam facere fugit natus
              officia nemo. Illum, quo nisi! Animi alias officiis in corrupti numquam laboriosam reprehenderit molestias
              nam quasi officia dicta dignissimos dolore quo expedita, atque id corporis saepe quas rerum neque fugiat?
              Voluptate, iure? Quaerat, porro! Ipsum, facilis? Quisquam autem ex fugiat explicabo totam inventore quas
              natus fuga quos eligendi nihil, consequatur aut suscipit molestiae ab accusantium sapiente vero maxime
              consequuntur atque earum delectus. Natus architecto quibusdam nobis officia voluptate consequuntur eius
              sequi dolore doloremque maiores quaerat at dolorum enim in totam accusamus odio autem ducimus
              reprehenderit, consequatur blanditiis recusandae cum? Nisi, molestias optio. Optio eaque maiores delectus
              cumque fugiat, nesciunt reprehenderit dolorem. Illo accusamus alias sit, id laboriosam ipsum. Laboriosam
              tenetur debitis delectus, earum quibusdam aperiam alias iste nisi consequatur, architecto maxime autem.
              Laboriosam nulla voluptatibus magni fuga ratione exercitationem labore voluptatem aperiam cupiditate
              officiis dolores laudantium dolorum a maiores dolore magnam, earum culpa consectetur temporibus ea numquam
              rem vel. Deleniti, facilis dignissimos! Amet blanditiis quod nobis animi aperiam accusamus mollitia
              praesentium laborum, saepe quo! Officiis incidunt dolorum sint dolore quisquam? Veniam natus, illum vel
              error quia laudantium iusto maxime laborum quaerat! Perspiciatis? Incidunt magnam dolore quaerat eaque
              necessitatibus autem quam, perspiciatis magni accusamus! Eos architecto nesciunt corporis debitis ullam
              hic. Ut eligendi modi dignissimos non, doloremque iure? Quia aliquam a deleniti magnam? Nihil eos, sint
              molestiae dolor nemo consectetur eaque explicabo fuga earum iure quia sed illum nam id ab sit quae officia
              unde nulla est temporibus error. Quasi consequuntur natus rerum!
            </div>
          </div>
          <div className='comment-card border-2 border-gray-300  max-h-[283px]  p-6 overflow-auto space-y-6'>
            <div className='avatar rounded-full border-4 w-[60px] h-[60px] bg-gradient-to-t'>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0BaxevbHsera-I9b57I40phEGm3caprMeLA&usqp=CAU" alt="" />
            </div>
            <div className='customer-name'>
              <h2 className='text-2xl font-bold'>Floyd Miles</h2>
            </div>
            <div className='content'>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam ut aperiam optio, ea nisi labore? Non
              repudiandae, eum, natus voluptas omnis fugiat unde, illo sapiente obcaecati voluptatum nihil quasi optio.
              Voluptas, magni facere cupiditate eum aperiam exercitationem enim blanditiis velit vero, id illum, optio
              praesentium neque possimus. Ea, nesciunt eius. Repellendus voluptate, reprehenderit perferendis dicta in
              nulla quia quo adipisci? Perferendis ducimus illo at, sequi ad magnam praesentium est maxime laboriosam
              alias corporis necessitatibus, repellendus aperiam facere distinctio, doloribus atque. Repellat saepe ab
              sunt animi atque. Omnis sequi explicabo dignissimos. Vel odit ipsa labore illum placeat accusantium
              asperiores sequi minima, nesciunt natus nostrum, illo deserunt at doloribus eligendi, dicta quidem
              delectus? Similique praesentium, ducimus inventore aliquid quia necessitatibus nulla eum? Ipsam cum
              facilis, earum fugit tempore eveniet accusantium inventore ex veniam obcaecati, error autem nesciunt. Sunt
              molestias beatae reiciendis nulla distinctio voluptas fugiat, commodi, voluptatibus totam, accusantium
              blanditiis nostrum iusto! In porro maxime quia amet asperiores sit aspernatur iusto itaque doloribus
              dolore unde sequi voluptatibus aut impedit ad est minus magni perspiciatis similique illo, blanditiis
              nisi. Modi nulla assumenda perspiciatis. Iure sequi, consequatur nostrum deserunt hic earum, et magnam
              ipsam iusto ullam pariatur tenetur incidunt eligendi voluptatum necessitatibus. Possimus aliquam porro
              blanditiis ad, vero enim labore similique magni cupiditate doloribus. Assumenda eaque suscipit, qui odio
              ipsam cum aspernatur, saepe perspiciatis eligendi aliquid rem cumque dignissimos dolore consequatur quidem
              laudantium dolorem. Ducimus, officiis velit cumque qui soluta rem incidunt omnis autem? Autem velit quam,
              facilis nemo laboriosam tempore facere ipsum reprehenderit qui officia repellendus quasi quo mollitia?
              Deleniti eveniet quidem iure accusamus praesentium quaerat fuga error unde, eligendi debitis magni
              incidunt? Accusantium voluptates voluptas architecto cupiditate sit atque maiores, explicabo praesentium
              ratione voluptatum. Corporis, assumenda ipsum. Totam odit temporibus quos excepturi at consequatur, vel
              quidem nulla, ex voluptatibus nisi, magni pariatur! Ipsum recusandae corrupti provident accusamus quisquam
              sit quibusdam? Expedita, ea sunt? Cumque natus molestiae facilis autem aliquam pariatur id aspernatur
              blanditiis libero. Reprehenderit illum accusamus dignissimos in dolores minima voluptatem? Corrupti fugit,
              in minus et eius nesciunt cupiditate assumenda voluptate nisi voluptatum veniam non expedita quod
              reprehenderit id magnam deleniti nostrum. Accusantium, inventore doloremque. Quibusdam facere fugit natus
              officia nemo. Illum, quo nisi! Animi alias officiis in corrupti numquam laboriosam reprehenderit molestias
              nam quasi officia dicta dignissimos dolore quo expedita, atque id corporis saepe quas rerum neque fugiat?
              Voluptate, iure? Quaerat, porro! Ipsum, facilis? Quisquam autem ex fugiat explicabo totam inventore quas
              natus fuga quos eligendi nihil, consequatur aut suscipit molestiae ab accusantium sapiente vero maxime
              consequuntur atque earum delectus. Natus architecto quibusdam nobis officia voluptate consequuntur eius
              sequi dolore doloremque maiores quaerat at dolorum enim in totam accusamus odio autem ducimus
              reprehenderit, consequatur blanditiis recusandae cum? Nisi, molestias optio. Optio eaque maiores delectus
              cumque fugiat, nesciunt reprehenderit dolorem. Illo accusamus alias sit, id laboriosam ipsum. Laboriosam
              tenetur debitis delectus, earum quibusdam aperiam alias iste nisi consequatur, architecto maxime autem.
              Laboriosam nulla voluptatibus magni fuga ratione exercitationem labore voluptatem aperiam cupiditate
              officiis dolores laudantium dolorum a maiores dolore magnam, earum culpa consectetur temporibus ea numquam
              rem vel. Deleniti, facilis dignissimos! Amet blanditiis quod nobis animi aperiam accusamus mollitia
              praesentium laborum, saepe quo! Officiis incidunt dolorum sint dolore quisquam? Veniam natus, illum vel
              error quia laudantium iusto maxime laborum quaerat! Perspiciatis? Incidunt magnam dolore quaerat eaque
              necessitatibus autem quam, perspiciatis magni accusamus! Eos architecto nesciunt corporis debitis ullam
              hic. Ut eligendi modi dignissimos non, doloremque iure? Quia aliquam a deleniti magnam? Nihil eos, sint
              molestiae dolor nemo consectetur eaque explicabo fuga earum iure quia sed illum nam id ab sit quae officia
              unde nulla est temporibus error. Quasi consequuntur natus rerum!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
