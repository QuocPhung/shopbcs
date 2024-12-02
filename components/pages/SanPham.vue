<template>
    <div>
        <div class="container products my-3">
            <h1>Kho Game</h1>
            <div>
                <label for="category">Chọn thể loại:</label>
                <select class="pick" v-model="selectedCategory">
                    <option value="all">Tất cả</option>
                    <option value="hanhdong">Hành động</option>
                    <option value="sinhton">Sinh tồn</option>
                    <option value="bansung">Bắn súng</option>
                    <option value="nhapvai">Nhập vai</option>
                </select>
            </div>
            <div class="product-items">
                <div class="product-item" v-for="shop in filteredShops" @click="showProductDetails(shop)" :key="shop.id">
                    <img :src="require(`@/assets/pic/${shop.thum}`)" alt="">
                    <div class="product-item-text">
                        <h4>{{ shop.name }}</h4>
                        <p><span>{{ shop.price }}</span><sup>đ</sup></p>
                    </div>
                    <button @click.stop="addToCart(shop)">Thêm vào giỏ hàng</button>
                </div>
            </div>

            <div v-if="selectedProduct" class="product-modal">
                <div class="modal-content">
                    <h3>Thông tin sản phẩm</h3>
                    <img :src="getImageSrc(selectedProduct.thum)" alt="">
                    <h4>{{ selectedProduct.name }}</h4>
                    <p><span style="font-weight: bold;">Giá:</span> {{ formatPrice(selectedProduct.price) }} đ</p>
                    <p><span style="font-weight: bold;">Mô tả:</span> {{ selectedProduct.description }}</p>
                    <button class="btn" style="background-color: rgb(50, 205, 108);color: #fff;" @click="closeProductDetails">Đóng</button>
                </div>
            </div>
        </div>

        <!-- tĩnh -->
        <!-- <div class="container products my-3">
            <h1>Kho Game</h1>
            <div>
                <label for="category">Chọn thể loại:</label>
                <select class="pick" v-model="selectedCategory">
                    <option value="all">Tất cả</option>
                    <option value="hanhdong">Hành động</option>
                    <option value="sinhton">Sinh tồn</option>
                    <option value="bansung">Bắn súng</option>
                    <option value="nhapvai">Nhập vai</option>
                </select>
            </div>
            <div class="product-items">
                <div class="product-item" v-for="shop in filteredShops" @click="showProductDetails(shop)" :key="shop.id">
                    <img :src="require(`@/assets/pic/${shop.thum}`)" alt="">
                    <div class="product-item-text">
                        <h4>{{ shop.name }}</h4>
                        <p><span>{{ shop.price }}</span><sup>đ</sup></p>
                    </div>
                    <button @click.stop="addToCart(shop)">Thêm vào giỏ hàng</button>
                </div>
            </div>

            <div v-if="selectedProduct" class="product-modal">
                <div class="modal-content">
                    <h3>Thông tin sản phẩm</h3>
                    <img :src="getImageSrc(selectedProduct.thum)" alt="">
                    <h4>{{ selectedProduct.name }}</h4>
                    <p><span style="font-weight: bold;">Giá:</span> {{ formatPrice(selectedProduct.price) }} đ</p>
                    <p><span style="font-weight: bold;">Mô tả:</span> {{ selectedProduct.description }}</p>
                    <button class="btn" style="background-color: rgb(50, 205, 108);color: #fff;" @click="closeProductDetails">Đóng</button>
                </div>
            </div>
        </div> -->
    </div>
</template>
<script>
    export default{
        name:'SanPham',
        props:['products'],
        data(){
            return{

                // chạy tĩnh
                // selectedProduct: null,
                // selectedCategory: 'all',
                // shops:[    
                //     { id: 1, thum: "Back4blood.jpg", name: "Back 4 Blood", price: "1.464.144",category:"sinhton", description:"Back 4 Blood là một trò chơi bắn súng góc nhìn thứ nhất hợp tác đầy hồi hộp, được phát triển bởi những người sáng tạo ra thương hiệu Left 4 Dead nổi tiếng. Trò chơi đưa người chơi vào giữa cuộc chiến chống lại những sinh vật đáng sợ trong một thế giới khải huyền." },
                //     { id: 2, thum: "COD CW.jpg", name: "Call Of Duty (CW)", price: "1.464.144",category:"bansung", description:"Call of Duty là một series trò chơi điện tử thuộc thể loại bắn súng góc nhìn thứ nhất, được phát hành bởi Activision. Series này bắt đầu từ năm 2003 và chủ yếu tập trung vào các trận chiến quân sự và tình huống chiến đấu, với nhiều phiên bản khác nhau được phát hành qua các năm."},
                //     { id: 3, thum: "COD.jpg", name: "Call Of Duty", price: "496.651",category:"bansung", description:"Call of Duty là một series trò chơi điện tử thuộc thể loại bắn súng góc nhìn thứ nhất, được phát hành bởi Activision. Series này bắt đầu từ năm 2003 và chủ yếu tập trung vào các trận chiến quân sự và tình huống chiến đấu, với nhiều phiên bản khác nhau được phát hành qua các năm."},
                //     { id: 4, thum: "Diablo.jpg", name: "Diablo", price: "1.646.000",category:"kinhdi", description:"Diablo là một series trò chơi điện tử hành động nhập vai về chủ đề dungeon crawler, được phát triển bởi Blizzard North và tiếp tục bởi Blizzard Entertainment. Series này nổi tiếng với gameplay hấp dẫn và cốt truyện tối tăm xoay quanh cuộc chiến giữa cái thiện và cái ác, với nhiều phần khác nhau, trong đó Diablo IV là phần thứ tư với nhân vật chính là Lilith, con gái của Mephisto." },
                //     { id: 5, thum: "FF23.jpg", name: "Fifa 23", price: "1.590.000",category:"chienthuat", description:"FIFA 23 mang đến trải nghiệm chân thật với hơn 19,000 cầu thủ, 700 đội bóng, 100 sân vận động và hơn 30 giải đấu. Người chơi có thể tham gia vào các giải đấu lớn nhất trên thế giới trong một trò chơi bóng đá đa dạng và phong phú." },
                //     { id: 6, thum: "Horizon.jpg", name: "Horizon Forbidden West", price: "1.999.000",category:"sinhton", description:"Horizon Forbidden West là một trò chơi điện tử nhập vai hành động thế giới mở được phát triển bởi Guerrilla Games và phát hành bởi Sony Interactive Entertainment vào năm 2022. Trò chơi đưa người chơi đến một tương lai xa, trong một thế giới hậu khải huyền, nơi bạn sẽ khám phá những vùng đất xa lạ, chiến đấu với những cỗ máy khổng lồ và gặp gỡ các bộ tộc mới đáng kinh ngạc." },
                //     { id: 7, thum: "review-ghost-of-tsushima-directors-cut-gameplay-hadoan-tv-1.jpg", name: "Ghost Of Tsushima", price: "1.280.000",category:"nhapvai", description:"Ghost of Tsushima là một trò chơi hành động phiêu lưu thế giới mở, được phát triển bởi Sucker Punch Productions và phát hành bởi Sony Interactive Entertainment. Trò chơi có cốt truyện sâu sắc và ngoài các yếu tố chiến đấu, còn kết hợp cả cách tiếp cận lén lút. Người chơi sẽ khám phá một thế giới rộng lớn, đẹp mắt và immersive, tham gia vào những câu chuyện phụ bao quanh cốt truyện chính." },
                //     { id: 8, thum: "GOW.jpg", name: "God Of War", price: "1.242.000",category:"nhapvai", description:"God of War là một trò chơi điện tử hành động phiêu lưu phát triển bởi Santa Monica Studio và được phát hành bởi Sony Interactive Entertainment vào năm 2018. Trong trò chơi, người chơi điều khiển Kratos, một chiến binh Spartan, với bối cảnh diễn ra trong thế giới của các vị thần Bắc Âu và quái vật, sau khi đã rời bỏ cuộc sống báo thù với các vị thần của Olympus." },
                //     { id: 9, thum: "GOWR.jpg", name: "God Of War Ragnarok", price: "1.400.000",category:"nhapvai", description:"God of War Ragnarök là phần cuối cùng trong thời kỳ Bắc Âu, xoay quanh nhân vật Kratos, Thần Chiến Tranh, cùng với con trai Atreus, khi họ đối mặt với nguy cơ đến từ Ragnarök. Game thuộc thể loại hành động phiêu lưu, cho phép người chơi điều khiển Kratos và Atreus trong một cuộc hành trình để ngăn chặn sự xuất hiện của Ragnarök. Game nổi bật với đồ họa tuyệt đẹp, quy mô ấn tượng và lối chơi chiến đấu mạnh mẽ, mang lại cảm giác hài lòng và vô cùng mãnh liệt." },
                //     { id: 10, thum: "GTAV.jpg", name: "Grand Theft Auto V", price: "455.500",category:["nhapvai","thegioimo"], description:"Grand Theft Auto V (GTA V) là một trò chơi điện tử hành động phiêu lưu được phát triển bởi Rockstar North và phát hành bởi Rockstar Games vào năm 2013. Đây là phần thứ mười lăm trong series Grand Theft Auto và là phần thứ năm trong vũ trụ HD. Trò chơi diễn ra trong một thế giới mở rộng lớn và người chơi có thể thực hiện nhiều nhiệm vụ khác nhau, tham gia vào các hoạt động tội phạm và khám phá môi trường đa dạng của thành phố Los Santos và các khu vực lân cận." },
                //     { id: 11, thum: "FH5.jpg", name: "Forza Horizon 5", price: "382.344",category:"hanhdong", description:"Forza Horizon 5 là một trò chơi đua xe thế giới mở, được phát triển bởi Playground Games và Turn 10 Studios, diễn ra tại Mexico. Trò chơi mang đến những sự kiện thời tiết độc đáo, từ bão cát đến bão nhiệt đới, tạo nên một môi trường sống động và thay đổi theo tuần. Forza Horizon 5 được coi là trò chơi đua xe thế giới mở tốt nhất hiện nay." },
                //     { id: 12, thum: "FFV.jpg", name: "Final Fantasy V", price: "399.000",category:"hanhdong", description:"Final Fantasy V là phần thứ 5 trong series Final Fantasy, được phát hành cho máy Nintendo Super. Trò chơi diễn ra trong một bối cảnh giả tưởng trung cổ, nơi một nhóm bốn người lạ được đưa hợp tác với nhau để cứu các viên tinh thể. Phiên bản Pixel Remaster của game đã tái hiện lại linh hồn của bản gốc, bao gồm đồ họa, âm thanh và lối chơi, cùng với hệ thống nghề nghiệp đa dạng cho nhân vật." },
                //     { id: 13, thum: "DB.jpg", name: "Dragon Ball: Sparking! ZERO", price: "680.000",category:"hanhdong", description:"DRAGON BALL: Sparking! ZERO là một trò chơi video thuộc series Budokai Tenkaichi, mang lại trải nghiệm gameplay huyền thoại và nâng cao nó lên những cấp độ mới. Trò chơi này giới thiệu các trận chiến 3D nhanh chóng, đầy cảm xúc, dựa trên anime và video game, với hình ảnh tuyệt đẹp và các đòn đánh chân thật." },
                //     { id: 14, thum: "kdr.jpg", name: "Kingdom Rush 5", price: "446.647",category:"hanhdong", description:"Kingdom Rush 5: Alliance là trò chơi phòng thủ tháp thứ năm trong loạt game Kingdom Rush và thứ sáu tổng thể, được phát triển bởi Ironhide Game Studio. Trò chơi có 16 loại tháp với kỹ năng đặc biệt, cho phép người chơi kết hợp các tháp mạnh nhất để phát triển chiến lược đa dạng. Người chơi sẽ phải đối mặt với những thách thức hành động trong 4 cảnh quan độc đáo và trải qua 19 giai đoạn chiến dịch với địa hình và thử thách khác nhau." },
                //     { id: 15, thum: "slh.jpg", name: "Silent Hill 2 Remake", price: "797.211",category:"hanhdong", description:"Silent Hill 2 Remake là một trò chơi kinh dị sinh tồn, được phát triển bởi Bloober Team và phát hành bởi Konami vào năm 2024. Đây là phiên bản làm lại của trò chơi video Silent Hill 2 ra mắt năm 2001. Người chơi sẽ hóa thân vào nhân vật chính James Sunderland, người nhận được một bức thư bí ẩn từ người vợ đã khuất, dẫn dắt anh trở lại thị trấn Silent Hill với những hình ảnh đồ họa hiện đại, bao gồm công nghệ ray tracing." },
                //     { id: 16, thum: "re3.jpg", name: "Resident Evil 3", price: "520.000",category:"kinhdi", description:"Resident Evil 3 là phiên bản làm lại của trò chơi Resident Evil 3: Nemesis, được phát triển bởi Capcom và phát hành vào năm 2020. Trò chơi tập trung vào nhân vật Jill Valentine, một trong những người sống sót cuối cùng ở Raccoon City, trong bối cảnh thành phố bị tàn phá bởi thí nghiệm của công ty Umbrella. Jill phải đối mặt với các kẻ thù bao gồm Nemesis, một sinh vật được tạo ra để săn lùng cô. Trò chơi nổi bật với đồ họa nâng cao, cơ chế gameplay hấp dẫn và một cốt truyện hồi hộp." },
                //     { id: 17, thum: "GT.jpg", name: "Ghostwire Tokyo", price: "749.000",category:"kinhdi", description:"Ghostwire: Tokyo là một trò chơi hành động được phát triển bởi Tango Gameworks và phát hành bởi Bethesda Softworks. Câu chuyện diễn ra trong một phiên bản hư cấu của Tokyo, nơi bị xâm chiếm bởi các thực thể siêu nhiên do một phù thủy gây ra, dẫn đến việc dân số thành phố biến mất một cách bí ẩn. Người chơi sẽ phải hợp tác với một sức mạnh mạnh mẽ để chiến đấu chống lại các thế lực này và khám phá những bí ẩn xoay quanh sự biến mất của dân cư. Trò chơi được phát hành vào ngày 25 tháng 3 năm 2022." },
                //     { id: 18, thum: "BR.jpg", name: "Backrooms: Last Room", price: "384.000",category:"kinhdi", description:"Backrooms: Last Room là một trải nghiệm đen tối, nơi người chơi sẽ khám phá các không gian bất thường qua ống kính của một camera VHS. Trò chơi này mang đến cảm giác cô đơn và lo âu, với môi trường như một thư viện vô tận có các hành lang rộng và giá sách, tạo ra cảm giác bí ẩn và ma quái." },
                //     { id: 19, thum: "re2.jpg", name: "Risident Evil 2", price: "920.521",category:"kinhdi", description:"Resident Evil 2 là một trò chơi video kinh dị sinh tồn phát triển và phát hành bởi Capcom vào năm 1998 cho hệ máy PlayStation. Trong trò chơi, người chơi điều khiển nhân vật Leon S. Kennedy, một cảnh sát mới vào nghề, trong bối cảnh thành phố Raccoon City đang bị tàn phá bởi một virus chết người, dẫn đến sự xuất hiện của những xác sống ăn thịt. Người chơi sẽ khám phá môi trường xung quanh, giải mã các câu đố và chiến đấu với quái vật để sống sót và tìm hiểu sự thật đằng sau thảm họa này." },
                //     { id: 20, thum: "LC.jpg", name: "Lethal Company", price: "248.201",category:"kinhdi", description:"Lethal Company là một trò chơi điện tử kinh dị sinh tồn hợp tác, được phát triển và phát hành bởi Zeekerss. Người chơi sẽ thu thập phế liệu từ các mặt trăng công nghiệp bị bỏ hoang để đáp ứng chỉ tiêu lợi nhuận của công ty. Trò chơi có các yếu tố hành động, phiêu lưu và độc lập, với bối cảnh là những khu vực tăm tối, được tạo ra ngẫu nhiên và đầy rẫy những mối đe dọa." },
                //     { id: 21, thum: "Grouded.jpg", name: "Grounded", price: "148.211",category:"sinhton", description:"Grounded có nghĩa là ổn định về tâm lý và cảm xúc; người nào đó được coi là grounded thường đưa ra quyết định tốt và không hành động hoặc nói những điều ngu ngốc. Họ thực tế, bình dị và có khả năng suy xét một cách hợp lý." },
                //     { id: 22, thum: "GH.jpg", name: "Green Hell", price: " 68.276",category:"sinhton", description:"Green Hell là một trò chơi video thể loại sinh tồn thế giới mở, được phát triển bởi Creepy Jar. Trò chơi diễn ra trong khu rừng Amazon hoang dã, nơi người chơi phải sống sót trong những điều kiện khắc nghiệt. Green Hell được phát hành lần đầu tiên vào ngày 29 tháng 8 năm 2018 cho Windows và sau đó cho các nền tảng khác. Người chơi bắt buộc phải quản lý sức khỏe, tâm lý và tài nguyên để tồn tại trong môi trường này." },
                //     { id: 23, thum: "SM.jpg", name: "Soulmark", price: "670.566",category:"sinhton", description:"Soulmark là một thuật ngữ trong fandom, chỉ một dấu hiệu trên cơ thể của nhân vật, giúp xác định soulmate (người tri kỷ) của họ. Đây là biểu hiện vật lý của sự kết nối tâm hồn giữa hai người. Soulmark thường ảnh hưởng đến cách nhân vật tiếp cận các mối quan hệ và nhận thức về một mối quan hệ định mệnh." },
                //     { id: 24, thum: "SV.jpg", name: "Stardew Valley", price: "84.208",category:"sinhton", description:"Stardew Valley là một trò chơi video nhập vai mô phỏng do Eric Barone phát triển, phát hành lần đầu vào ngày 26 tháng 2 năm 2016. Người chơi kế thừa một mảnh đất farm cũ từ ông nội và bắt đầu cuộc sống mới với công việc nông nghiệp, khai thác tài nguyên và xây dựng mối quan hệ với cư dân trong vùng. Trò chơi mang lại trải nghiệm mở, cho phép người chơi tự do khám phá và phát triển farm theo cách riêng của mình." },
                //     { id: 25, thum: "Mine.jpg", name: "Minecraft", price: "1.163.000",category:"sinhton", description:"Minecraft là một trò chơi sandbox được phát triển và phát hành bởi Mojang Studios vào năm 2011. Trong trò chơi, người chơi có thể xây dựng mọi thứ mà họ tưởng tượng, khám phá những bí ẩn kỳ lạ và tồn tại qua đêm. Minecraft kết hợp nhiều yếu tố như khối, sinh vật và cộng đồng, cho phép người chơi lựa chọn giữa chế độ sinh tồn hoặc sáng tạo." },
                //     { id: 26, thum: "BMW2.jpg", name: "Black Myth Wukong", price: "1.599.000",category:"nhapvai", description:"Black Myth: Wukong là một trò chơi nhập vai hành động dựa trên tác phẩm Tây Du Ký, một trong bốn văn kiện kinh điển lớn của văn học Trung Quốc. Trò chơi nổi bật với lối chơi hành động chặt chém tương tự như God of War, kết hợp với các yếu tố của các trò chơi Soul Like. Câu chuyện xoay quanh hành trình của nhân vật chính trong việc tìm kiếm Lục Căn, cùng với những cái nhìn mới về thế giới Tây Du Ký." },
                //     { id: 27, thum: "LostH.jpeg", name: "Lost Horizon", price: "1.599.000",category:"sinhton", description:"Lost Horizon là một tiểu thuyết được viết bởi tác giả người Anh James Hilton vào năm 1933. Câu chuyện xoay quanh một người lính tình cờ phát hiện ra Shangri-La, một nơi được coi là hy vọng lớn nhất cho hòa bình nằm sâu trong dãy Himalaya, Tây Tạng. Tiểu thuyết khám phá các chủ đề như Utopia như một nơi trú ẩn, phương Đông như nguồn tri thức, và sự căng thẳng giữa tham vọng và sự lười biếng." },
                //     { id: 28, thum: "Sunkun.jpg", name: "Sunkenland", price: "1.599.000",category:"sinhton", description:"Sunkenland là một trò chơi sinh tồn lấy cảm hứng từ thế giới nước, nơi người chơi có thể khám phá các thành phố bị chìm, xây dựng căn cứ, chế tạo vật phẩm, giao dịch và chiến đấu với cướp biển trong cuộc chiến sinh tồn. Trò chơi bao gồm các yếu tố xây dựng căn cứ mô-đun, tìm kiếm tài nguyên từ các thành phố ngập nước, phòng thủ căn cứ và đối mặt với các bộ tộc NPC xâm lấn." },
                //     { id: 29, thum: "Plant.jpg", name: "The Planet Crafter Planet Humble", price: "1.599.000",category:"sinhton", description:"Planet Humble trong trò chơi The Planet Crafter là một hành tinh mới, nhỏ bằng một nửa kích thước của hành tinh trong trò chơi gốc. Nơi đây có nhiều môi trường mới và có thể khám phá nhiều bí mật và câu chuyện chưa được biết đến. Hành tinh này cũng giàu sulfur và có nhiều di tích của các robot Starform Robotics, là nguồn cung cấp iridium, nhôm, uranium và các vật phẩm ban đầu khác." },  
                //     { id: 30, thum: "Clans.jpg", name: "MechWarrior 5: Clans", price: "1.599.000",category:"bansung", description:"MechWarrior 5: Clans là một trò chơi hành động chiến thuật nổi bật với chiến dịch phong phú, câu chuyện được kể hấp dẫn và thiết kế nhiệm vụ tuyệt vời. Người chơi sẽ lãnh đạo một đội gồm năm BattleMech trong một nhóm gọi là "},
                //     { id: 31, thum: "63.jpg", name: "63 Days", price: "1.599.000",category:"bansung", description:"63 Days là một trò chơi chiến lược theo phong cách tàng hình, mô phỏng các tình huống chiến thuật theo thời gian thực, tương tự như loạt game Commandos. Trò chơi diễn ra trong bối cảnh lịch sử có nhiều chủ đề nặng nề như bạo lực, chiến tranh và các chủ đề dark khác, khai thác các khía cạnh thực tế của cuộc chiến tranh." }, 
                //     { id: 32, thum: "cyber.jpg", name: "Cyberpunk 2077", price: "1.599.000",category:"bansung", description:"Cyberpunk 2077 là một trò chơi điện tử hành động nhập vai, do CD Projekt Red phát triển và phát hành vào ngày 10 tháng 12 năm 2020. Trò chơi diễn ra trong một thế giới mở mang tên Night City, nơi người chơi khám phá những công nghệ tiên tiến và xã hội tương lai đầy rẫy tội phạm và tham nhũng. Người chơi vào vai V, một nhân vật có thể tùy biến, người đang tìm kiếm một cơ thể giả lập chứa đựng ý thức của một huyền thoại nhạc rock tên Johnny Silverhand." }, 
                //     { id: 33, thum: "Planet.jpg", name: "Planetbase", price: "1.599.000",category:"nhapvai", description:"Planetbase là một trò chơi chiến lược và mô phỏng không gian, nơi người chơi dẫn dắt một nhóm các nhà định cư không gian cố gắng thiết lập một trạm tiền đồn trên một hành tinh xa lạ. Trò chơi này được phát triển bởi hãng Madruga Works và ra mắt vào ngày 16 tháng 10 năm 2015." },
                //     { id: 33, thum: "quiet.jpg", name: "A Quiet Place: The Road Ahead", price: "1.599.000",category:"all", description:"A Quiet Place: The Road Ahead là một trò chơi phiêu lưu kinh dị dành cho một người chơi, được lấy cảm hứng từ bộ phim nổi tiếng cùng tên. Người chơi sẽ vào vai Alex Taylor và phải sống sót trong một thế giới bị hủy diệt, chỉ có thể sử dụng sự thông minh và các công cụ tìm kiếm để vượt qua các thử thách. Trò chơi nhấn mạnh vào việc sinh tồn trong im lặng."},
                //     { id: 33, thum: "ember.jpg", name: "Ember Knights Wrath of the Architect", price: "1.599.000",category:"all", description:"Ember Knights: Wrath of the Architect là một trò chơi hành động nhập vai, nơi người chơi vào vai những chiến binh Ember có nhiệm vụ chiến đấu qua bốn thế giới biến đổi đầy những quái vật và trùm ác độc. Câu chuyện xoay quanh việc ngăn chặn Praxis, người đã xé rách giữa các thế giới trong nỗ lực tìm kiếm sức mạnh tối thượng và thách thức kiến trúc sư của không gian và thời gian."},                  
                // ]
            }
        },
        methods:{

            // tĩnh
            // addToCart(shop) {
            //     this.$emit('addToCart', shop);
            // },
            // showProductDetails(shop) {
            //     this.selectedProduct = shop; // Lưu sản phẩm được chọn để hiển thị
            // },
            // closeProductDetails() {
            //     this.selectedProduct = null; // Đóng modal chi tiết sản phẩm
            // },
            // getImageSrc(thum) {
            //     return require(`@/assets/pic/${thum}`);
            // },
            // formatPrice(price) {
            //     return price.replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Định dạng giá với dấu chấm
            // },
        },
        computed:{

            //tĩnh
            // filteredShops() {
            //     if (this.selectedCategory === 'all') {
            //         return this.shops;
            //     }
            //         return this.shops.filter(shop => shop.category === this.selectedCategory);
            // }
        },
    }
</script>
<style>
.products{
    border: 1px solid #EFF0F3;
    border-radius: 5px;
}
h1{
    text-align: center;
    color: #FF5622;
}
.pick{
    margin: 5px;
    border-radius: 5px;
}
.product-items {
    display: flex;
    padding: 12px;
    flex-wrap: wrap;
}
.product-item {
    width: 19%;
    min-width: 200px;
    background-color: #fff;
    box-shadow: 0px 5px 10px gray;
    padding: 12px;
    margin-bottom: 12px;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.product-item:hover {
    box-shadow: 0px 5px 10px rgba(0,0,0,0.2);
    transform: scale(1.05);
    transform: translateY(-5px);
}
.product-item img {
    border: 1px solid #2f2f2f;
    width: 100%;
    height: 50%;
    margin-bottom: 20px;
} 
.product-item-text h4 {
    font-size: 1rem;
}
.product-item button {
    margin-bottom: 12px;
    height: 30px;
    padding: 0 12px;
    cursor: pointer;
    border: none;
    border-radius: 5px;
}
.product-item button:hover {
    background-color: greenyellow;
    transform: translateY(-5px);
    box-shadow: 0px 5px 10px gray;
}
.btn-added {
    background-color: gray;
    color: white;
    border: none;
    cursor: not-allowed;
}
.product-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    width: 50%;
    max-width: 600px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: scale(0.8);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}
</style>