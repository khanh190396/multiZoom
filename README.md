# multiZoom
<pre>
Giới thiệu:
    - Chức năng multi zoom giúp bạn:
	+ Tạo hiệu ứng phóng to cho ảnh khi di chuột qua
	+ Cho phép dùng cùng lúc chức năng này cho nhiều ảnh
    - Ưu điểm:
	+ Dễ nhúng.
	+ Tùy ý setting cho các thành phần như zoom image, target image mà không sợ vỡ bố cục
	+ Zoom lens tự động điều chỉnh hình dạng theo tỉ lệ kích thước của zoom image

Hướng dẫn sử dụng:
    - Cách 1: Download source code về
        + git clone https://github.com/khanh190396/multiZoom
        + Nhúng link css vào phần head và js vào file html vào cuối hoặc sau phần body
    - Cách 2: Nhúng trực tiếp từ link online
        + Link css: https://tnkhanh996.000webhostapp.com/multiZoom/css.css
        + Link js: https://tnkhanh996.000webhostapp.com/multiZoom/zoomjs.js
    - Sử dụng: 
        + Thêm class targetImage vào ảnh
        + Lăn con lăn khi đang trỏ chuột vào target image để thay đổi độ phóng to
    - Cài đặt bổ sung cho zoom image của tất cả các target image:
        Thêm đoạn javascript sau vào sau phần nhúng file js

            settingZoomImage([optionY, moveRight, optionX, moveBottom]);

        Trong đó:
            + OptionY là vị trí của zoom image theo chiều ngang, gồm:
                "left": mép trái zoom image liền với mép trái màn hình
                "right": tương tự "left"
                "stick-left": mép phải zoom image liền với mép trái target image
                "stick-right": tương tự "stick-left"
                "centre": zoom image căn giữa màn hình theo chiều ngang
                Định dạng string, phải để trong dấu nháy
            + OptionX là vị trí của zoom image theo chiều dọc, gồm:
                "top": mép trên zoom image liền với mép trên màn hình
                "bottom" tương tự "top"
                "centre": zoom image căn giữa màn hình theo chiều dọc
                "stick-centre": zoom image căn giữa target image theo chiều dọc
                Định dạng string, phải để trong dấu nháy
            + MoveRight: zoom image dịch sang phải tính theo pixel
            + MoveBottom: zoom image dịch xuống dưới tính theo pixel
        Mặc định: Khi không dùng hàm settingImage thì hệ thống sẽ hiểu như mình đang dùng hàm này với giá trị như sau:

            settingZoomImage(["stick-right", 0, "stick-centre", 0]);

    - Cài đặt bổ sung cho zoom image đối với từng target image:
        Thêm thuộc tính sau vào từng ảnh:
            
            settingZoomImage="optionY moveRight optionX moveBottom"

        Cách dùng giống với hàm tổng quát đã nêu ở trên
        Ảnh nào thêm thuộc tính này sẽ dùng cài đặt riêng thay vì cài đặt tổng quát
        Ví dụ: settingZoomImage="centre 0 centre 0"
</pre>