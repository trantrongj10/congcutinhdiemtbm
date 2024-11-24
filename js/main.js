var objUrl = new URL(location.href);
var type = objUrl.searchParams.get("type");
type = type == null || type == "null" ? "sort-canam" : type;
$("." + type).removeClass("hide-box");
$(".category li[data-name='" + type + "']").addClass("selected");
$(".header").text(
    type == "sort-canam" ? "Xếp loại học sinh cả năm"
        : type == "canam" ? "Tính điểm trung bình môn cả năm"
            : type == "hocky" ? "Tính điểm trung bình môn học kỳ" : ""
);
//tính xếp loại học sinh
$('.class-selected').on('change', function (e) {
    var valueSelected = this.value;
    $(".rs-sort-canam").addClass("hide-box");
    switch (valueSelected) {
        case "":
            $(".subject").addClass("hide-box");
            $("#btn-sort-canam").addClass("hide-box");
            break;
        case "lop67":
            $(".subject").removeClass("hide-box");
            $("#btn-sort-canam").removeClass("hide-box");
            $(".subject input").removeClass("hide-box");
            $("#txtHoaHoc").addClass("hide-box");
            $("#txtTinHoc").addClass("hide-box");
            break;
        case "lop89":
            $(".subject").removeClass("hide-box");
            $("#btn-sort-canam").removeClass("hide-box");
            $(".subject input").removeClass("hide-box");
            $("#txtTinHoc").addClass("hide-box");
            break;
        case "lop1012":
            $(".subject").removeClass("hide-box");
            $("#btn-sort-canam").removeClass("hide-box");
            $(".subject input").removeClass("hide-box");
            break;
        default: break;
    }
});
$("#btn-sort-canam").click(function () {
    var txtToan = parseFloat($("#txtToan").val() == "" ? "0" : $("#txtToan").val());
    var txtVan = parseFloat($("#txtVan").val() == "" ? "0" : $("#txtVan").val());
    var txtVatly = parseFloat($("#txtVatly").val() == "" ? "0" : $("#txtVatly").val());
    var txtTiengAnh = parseFloat($("#txtTiengAnh").val() == "" ? "0" : $("#txtTiengAnh").val());
    var txtGDCD = parseFloat($("#txtGDCD").val() == "" ? "0" : $("#txtGDCD").val());
    var txtCongNghe = parseFloat($("#txtCongNghe").val() == "" ? "0" : $("#txtCongNghe").val());
    var txtLichSu = parseFloat($("#txtLichSu").val() == "" ? "0" : $("#txtLichSu").val());
    var txtDialy = parseFloat($("#txtDialy").val() == "" ? "0" : $("#txtDialy").val());
    var txtSinhHoc = parseFloat($("#txtSinhHoc").val() == "" ? "0" : $("#txtSinhHoc").val());
    var txtHoaHoc = parseFloat($("#txtHoaHoc").val() == "" ? "0" : $("#txtHoaHoc").val());
    var txtTinHoc = parseFloat($("#txtTinHoc").val() == "" ? "0" : $("#txtTinHoc").val());

    var classSelect = $('.class-selected').val();
    var dtb = 0.0;
    if (classSelect == "lop67") {
        dtb = (txtToan + txtVan + txtVatly + txtTiengAnh + txtGDCD + txtCongNghe + txtLichSu + txtDialy + txtSinhHoc) / 9;
    } else if (classSelect = "lop89") {
        dtb = (txtToan + txtVan + txtVatly + txtTiengAnh + txtGDCD + txtCongNghe + txtLichSu + txtDialy + txtSinhHoc + txtHoaHoc) / 10;
    } else if (classSelect == "lop1012") {
        dtb = (txtToan + txtVan + txtVatly + txtTiengAnh + txtGDCD + txtCongNghe + txtLichSu + txtDialy + txtHoaHoc + txtSinhHoc + txtTinHoc) / 11;
    }
    //tính kết quả
    dtb = dtb.toFixed(1);
    var sort = "";
    switch (classSelect) {
        case "lop67":
            if (dtb >= 8.0 && (txtToan >= 8.0 || txtVan >= 8.0 || txtTiengAnh >= 8.0) && isTBM(6.5)) {
                sort = "Giỏi";
            } else if (dtb >= 6.5 && (txtToan >= 6.5 || txtVan >= 6.5 || txtTiengAnh >= 6.5) && isTBM(5.0)) {
                sort = "Khá";
            } else if (dtb >= 5.0 && (txtToan >= 5.0 || txtVan >= 5.0 || txtTiengAnh >= 5.0) && isTBM(3.5)) {
                sort = "Trung bình";
            } else if (dtb >= 3.5 && isTBM(2.0)) {
                sort = "Yếu"
            } else {
                sort = "Kém";
            }
            break;
        case "lop89":
            if (dtb >= 8.0 && (txtToan >= 8.0 || txtVan >= 8.0 || txtTiengAnh >= 8.0)
                && isTBM(6.5) && txtHoaHoc >= 6.5) {
                sort = "Giỏi";
            } else if (dtb >= 6.5 && (txtToan >= 6.5 || txtVan >= 6.5 || txtTiengAnh >= 6.5)
                && isTBM(5.0) && txtHoaHoc >= 5.0) {
                sort = "Khá";
            } else if (dtb >= 5.0 && (txtToan >= 5.0 || txtVan >= 5.0 || txtTiengAnh >= 5.0)
                && isTBM(3.5) && txtHoaHoc >= 3.5) {
                sort = "Trung bình";
            } else if (dtb >= 3.5 && isTBM(2.0) && txtHoaHoc >= 2.0) {
                sort = "Yếu"
            } else {
                sort = "Kém";
            }
            break;
        case "lop1012":
            if (dtb >= 8.0 && (txtToan >= 8.0 || txtVan >= 8.0 || txtTiengAnh >= 8.0)
                && isTBM(6.5) && txtHoaHoc >= 6.5 && txtTinHoc >= 6.5) {
                sort = "Giỏi";
            } else if (dtb >= 6.5 && (txtToan >= 6.5 || txtVan >= 6.5 || txtTiengAnh >= 6.5)
                && isTBM(5.0) && txtHoaHoc >= 5.0 && txtTinHoc >= 5.0) {
                sort = "Khá";
            } else if (dtb >= 5.0 && (txtToan >= 5.0 || txtVan >= 5.0 || txtTiengAnh >= 5.0)
                && isTBM(3.5) && txtHoaHoc >= 3.5 && txtTinHoc >= 3.5) {
                sort = "Trung bình";
            } else if (dtb >= 3.5 && isTBM(2.0)
                && txtHoaHoc >= 2.0 && txtTinHoc >= 2.0) {
                sort = "Yếu"
            } else {
                sort = "Kém";
            }
            break;
    }
    $(".rs-sort-canam").removeClass("hide-box");
    $(".rs-sort-canam .dtb").html("Điểm trung bình cả năm của bạn là: <b>" + dtb + "</b>");
    $(".rs-sort-canam .sort").text("Bạn xếp loại học lực " + sort);
});
function isTBM(tbm) {
    var txtToan = parseFloat($("#txtToan").val() == "" ? "0" : $("#txtToan").val());
    var txtVan = parseFloat($("#txtVan").val() == "" ? "0" : $("#txtVan").val());
    var txtVatly = parseFloat($("#txtVatly").val() == "" ? "0" : $("#txtVatly").val());
    var txtTiengAnh = parseFloat($("#txtTiengAnh").val() == "" ? "0" : $("#txtTiengAnh").val());
    var txtGDCD = parseFloat($("#txtGDCD").val() == "" ? "0" : $("#txtGDCD").val());
    var txtCongNghe = parseFloat($("#txtCongNghe").val() == "" ? "0" : $("#txtCongNghe").val());
    var txtLichSu = parseFloat($("#txtLichSu").val() == "" ? "0" : $("#txtLichSu").val());
    var txtDialy = parseFloat($("#txtDialy").val() == "" ? "0" : $("#txtDialy").val());

    return (txtToan >= tbm && txtVan >= tbm && txtVatly >= tbm && txtTiengAnh >= tbm
        && txtGDCD >= tbm && txtCongNghe >= tbm && txtLichSu >= tbm && txtDialy >= tbm);
}
//Tính trung bình 1 môn học cả năm
$("#btn-canam").click(function () {
    var tb1 = parseFloat($("#tb1").val() == "" ? "0" : $("#tb1").val());
    var tb2 = parseFloat($("#tb2").val() == "" ? "0" : $("#tb2").val());
    $(".rs-canam").removeClass("hide-box");
    var dtb = (tb1 + (tb2 * 2)) / 3;
    dtb = dtb.toFixed(1);
    $(".rs-canam .sort").html("Điểm trung bình cả năm môn này của bạn là: <b>" + dtb + "</b>");
});
$("#btn-hocky").click(function () {
    var poinHK = parseFloat($("#pointHK").val() == "" ? "0" : $("#pointHK").val());
    var poinGK = parseFloat($("#pointGK").val() == "" ? "0" : $("#pointGK").val());
    var poinCK = parseFloat($("#pointCK").val() == "" ? "0" : $("#pointCK").val());
    var countHk = parseFloat($("#countHk").val() == "" ? "0" : $("#countHk").val());
    $(".rs-hocky").removeClass("hide-box");
    var dtb = (poinHK + (2.0 * poinGK) + (3.0 * poinCK)) / (countHk + 5.0)
    dtb = dtb.toFixed(1);
    $(".rs-hocky .sort").html("Điểm trung bình học kỳ này của bạn là: <b>" + dtb + "</b>");
});