<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      size="small"
      :inline="true"
      v-show="showSearch"
    >
      <el-form-item label="姓名" prop="empName">
        <el-input
          v-model="queryParams.empName"
          placeholder="请输入员工姓名"
          clearable
          style="width: 240px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="部门" prop="deptName">
        
        <el-select
          v-model="queryParams.deptName"
          placeholder="请选择部门"
          clearable
          style="width: 240px"
        >
          <el-option
            v-for="dict in this.deptOptions"
            :key="dict"
            :label="dict"
            :value="dict"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="学历" prop="empDegreeName">
        <el-select
          v-model="queryParams.empDegreeName"
          placeholder="请选择学历"
          clearable
          style="width: 240px"
        >
          <el-option
            v-for="dict in this.degree" 
            :key="dict"
            :label="dict"
            :value="dict"
          />
        </el-select>
      </el-form-item>
      
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          size="mini"
          @click="handleQuery"
          >搜索</el-button
        >
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery"
          >重置</el-button
        >
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          >新增</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          >修改</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          >删除</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <download-excel
              class="export-excel-wrapper"
              :data="allDatas"
              :fields="json_fields"
              name="员工数据.xls"
            >
              <!-- 上面可以自定义自己的样式，还可以引用其他组件button -->
              <el-button
                type="warning"
                plain
                icon="el-icon-download"
                size="mini"
                @click="handleExport"
                >导出</el-button
              >
        </download-excel>

        
      </el-col>
      
    </el-row>


    <el-table
      v-loading="loading"
      :data="roleList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="序号" prop="id" width="120" />
      <el-table-column
        label="职工姓名"
        prop="empName"
        :show-overflow-tooltip="true"
        width="150"
      />
      <el-table-column
        label="性别"
        prop="sex"
        :show-overflow-tooltip="true"
        width="150"
      />
      <el-table-column label="年龄" prop="age" width="100" />
      <el-table-column label="部门名称" prop="deptName" width="100">
      </el-table-column>
      <el-table-column
        label="学历"
        align="center"
        prop="empDegreeName"
        width="180"
      >
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope" v-if="scope.row.roleId !== 1">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改角色配置对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="职工姓名" prop="empName">
          <el-input v-model="form.empName" placeholder="请输入职工姓名" />
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio v-model="form.sex" label="男">男</el-radio>
          <el-radio v-model="form.sex" label="女">女</el-radio>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="form.age" placeholder="请输入年龄" />
        </el-form-item>
        <el-form-item label="部门名称" prop="deptName">
          <el-select v-model="form.deptName" placeholder="请选择部门名称" size="medium">
            <el-option
              v-for="item in this.deptOptions"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学历" prop="empDegreeName">
          <el-select v-model="form.empDegreeName" placeholder="请选择学历">
              <el-option
                v-for="item in this.degree"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
        </el-form-item>
        
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

   
  </div>
</template>

<script>
import {
  listRole,
  getRole,
  delRoles,
  addRoles,
  updateRoles,
  getDeptNames,
  listRoles,
} from "@/api/role";
import { treeselect as menuTreeselect, roleMenuTreeselect } from "@/api/menu";

export default {
  name: "Role",
  // dicts: ["sys_normal_disable"],
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      
      // 日期范围
      dateRange: [],
      // 部门列表
      deptOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        empName: undefined,
        deptName: undefined,
        degree: undefined,
      },
      //全部数据
      allDatas:[],
      // 表单参数
      form: {},
      defaultProps: {
        children: "children",
        label: "label",
      },
      //学历
      degree:["高中","大专","本科","硕士","博士","其他"],
      
      // 表单校验
      rules: {
        roleName: [
          { required: true, message: "角色名称不能为空", trigger: "blur" },
        ],
        roleKey: [
          { required: true, message: "权限字符不能为空", trigger: "blur" },
        ],
        roleSort: [
          { required: true, message: "角色顺序不能为空", trigger: "blur" },
        ],
      },

      title: "员工表格",
      json_fields: {
        "序号":'id',
        "职工姓名":'empName',
        "性别":'sex',
        "年龄":'age',
        "部门名称":'deptName',
        "学历":'empDegreeName',
      },
      

    };
  },
  created() {
    this.getList();
    this.handleDept();
  },

  methods: {
    /** 查询角色列表 */
    getList() {
      this.loading = true;
      listRole(this.queryParams).then(
        (response) => {
          this.roleList = response.data.records;
          this.total = response.data.total;
          this.loading = false;
        }
      );
    },
    
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 取消按钮（数据权限）
    cancelDataScope() {
      this.openDataScope = false;
      this.reset();
    },
    // 表单重置
    reset() {
      if (this.$refs.menu != undefined) {
        this.$refs.menu.setCheckedKeys([]);
      }
      (this.menuExpand = false),
        (this.menuNodeAll = false),
        (this.deptExpand = true),
        (this.deptNodeAll = false),
        (this.form = {
          roleId: undefined,
          roleName: undefined,
          roleKey: undefined,
          roleSort: 0,
          status: "0",
          menuIds: [],
          deptIds: [],
          menuCheckStrictly: true,
          deptCheckStrictly: true,
          remark: undefined,
        });
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.dateRange = [];
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.id);
      this.single = selection.length != 1;
      this.multiple = !selection.length;

      console.log(this.single, this.multiple);
    },

    
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.handleDept();
      this.open = true;
      this.title = "添加角色";
    },

    //获取部门信息
    handleDept(){
      getDeptNames().then((res) => {
        this.deptOptions = res.data
      })
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.handleDept();
      this.reset();
      const roleId = row.id || this.ids;
      getRole(roleId).then((response) => {
        this.form = response.data;
        this.open = true;
        this.$nextTick(() => {
          roleMenu.then((res) => {
            let checkedKeys = res.checkedKeys;
            checkedKeys.forEach((v) => {
              this.$nextTick(() => {
                this.$refs.menu.setChecked(v, true, false);
              });
            });
          });
        });
        this.title = "修改角色";
      });
    },
    
    
    /** 提交按钮 */
    submitForm: function () {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          console.log(this.form)
          if (this.form.id != undefined) {
            updateRoles(this.form).then((response) => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addRoles(this.form).then((response) => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },

    /** 删除按钮操作 */
    handleDelete(row) {
      const roleIds = row.id || this.ids;

      this.$modal
        .confirm('是否确认删除角色编号为"' + roleIds + '"的数据项？')
        .then(function () {
          return delRoles(roleIds);
        })
        .then(() => {
          this.getList();
          this.$modal.msgSuccess("删除成功");
        })
        .catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
        listRoles().then((res) => {
          this.allDatas = res.data
        })
    },
  },
};
</script>
