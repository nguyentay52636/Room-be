const Customer = require("../models/KhachHang");
const nguoiDung = require("../models/nguoidung");
const mongoose = require("mongoose");
const { responseApi } = require("../config/response");

const getCustomers = async (req, res) => {
    try {
        const customers = await Customer.find().populate("nguoiDungId");
        console.log(customers);
       return responseApi(res, 200, customers, "Get customers successfully");   
    } catch (error) {
        return responseApi(res, 500, error.message, "Get customers failed");
    }
}

const getCustomerById = async (req, res) => {
    const {id} = req.params
    try {
        if(!id) {
            return responseApi(res, 400, null, "Customer not found");
        }
        
        const customer = await Customer.findById(id).populate("nguoiDungId");
        if(!customer) {
            return responseApi(res, 400, null, "Customer not found");
        }
        return responseApi(res, 200, customer, "Get customer by id successfully");
    } catch (error) {
        return responseApi(res, 500, error.message, "Get customer by id failed");
    }
}

const createCustomer = async (req, res) => {
    try {
  const { nguoiDungId, diaChi, loai, tongChiTieu, soBdsDangThue, soBdsYeuThich, soDanhGia, diemTrungBinh, bdsDangThueHienTai, ngayKetThucHopDong, lanHoatDongGanNhat, ghiChu } = req.body ;
  if(!nguoiDungId || !diaChi) {
    return responseApi(res, 400, null, "Missing required fields");
  }
  if(nguoiDungId) { 
    const checkUser = await nguoiDung.findById(nguoiDungId);
    if(!checkUser) {
      return responseApi(res, 400, null, "Nguoi dung not found");
    }
    const  newCustomer = { 
        nguoiDungId,
        diaChi,
        loai,
        tongChiTieu,
        soBdsDangThue,
        soBdsYeuThich,
        soDanhGia,
        diemTrungBinh,
        bdsDangThueHienTai,
        ngayKetThucHopDong,
        lanHoatDongGanNhat,
        ghiChu,
    }
    const customer = await Customer.create(newCustomer);
    return responseApi(res, 200, customer, "Create customer successfully");
}
} catch (error) {
    return responseApi(res, 500, error.message, "Create customer failed");
}
}

const deleteCustomer = async (req, res) => {
    const {id} = req.params;
    try {
        const checkCustomer = await Customer.findById(id);
        if(!checkCustomer) {
            return responseApi(res, 400, null, "Customer not found");
        }
        if(checkCustomer.nguoiDungId) {
            const checkUser = await nguoiDung.findById(checkCustomer.nguoiDungId);
            if(checkUser) {
                checkUser.trangThai = "hoat_dong";
            }
        }
  if(!id) { 
    return responseApi(res, 400, null, "Customer not found");
  }
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return responseApi(res, 400, null, "Customer not found");
  }
        const customer = await Customer.findByIdAndDelete(id);
        return responseApi(res, 200, customer, "Delete customer successfully");
    } catch (error) {
        return responseApi(res, 500, error.message, "Delete customer failed");
    }

}

const updateCustomer = async (req, res) => {
    const {id} = req.params;
    const {nguoiDungId, diaChi, loai, tongChiTieu, soBdsDangThue, soBdsYeuThich, soDanhGia, diemTrungBinh, bdsDangThueHienTai, ngayKetThucHopDong, lanHoatDongGanNhat, ghiChu } = req.body;
    try {
        if(!id) {
            return responseApi(res, 400, null, "Customer not found");
        }
      
        const checkCustomer = await Customer.findById(id);
        if(!checkCustomer) {
            return responseApi(res, 400, null, "Customer not found");
        }
        if(nguoiDungId) {
            const checkUser = await nguoiDung.findById(nguoiDungId);
            if(!checkUser) {
                return responseApi(res, 400, null, "Nguoi dung not found");
            }
        }
        const  newCustomer = { 
            nguoiDungId,
            diaChi,
            loai,
            tongChiTieu,
            soBdsDangThue,
            soBdsYeuThich,
            soDanhGia,
            diemTrungBinh,
            bdsDangThueHienTai,
            ngayKetThucHopDong,
            lanHoatDongGanNhat,
            ghiChu,
        }  
        const updateCustomer = await Customer.findByIdAndUpdate(id, newCustomer, {new: true});
        return responseApi(res, 200, updateCustomer, "Update customer successfully");
    } catch (error) {
        return responseApi(res, 500, error.message, "Update customer failed");
    }
}   

module.exports = {
    getCustomers, getCustomerById, createCustomer, deleteCustomer, updateCustomer
}