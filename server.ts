import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route: Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "自愈待办运维中心本地逻辑引擎运行中" });
  });

  // API Route: Local rule-based deterministic parser of unstructured text (Replaces AI)
  app.post("/api/parse-unstructured", (req, res) => {
    try {
      const { text, currentDate } = req.body;
      if (!text || text.trim() === "") {
        return res.status(400).json({ error: "请输入需要解析的文本内容" });
      }

      const input = text;

      // 1. Title Resolution (Extract text in brackets, or first significant line)
      let title = "微服务协同流程指令";
      const bracketMatch = input.match(/【([^】]+)】/);
      if (bracketMatch) {
        const bracketContent = bracketMatch[1];
        const remainingText = input.replace(/【[^】]+】/, "").trim();
        const cleanRemaining = remainingText.slice(0, 18).replace(/[，。；：]/g, "");
        title = `${bracketContent}：${cleanRemaining}`;
      } else {
        title = input.slice(0, 18).replace(/[，。；：]/g, "");
      }

      // 2. Source System Determination
      let sourceSystem = "异常物料处理系统";
      if (input.includes("Others") || input.includes("others") || input.includes("二次配管") || input.includes("厂务") || input.includes("配管") || input.includes("气室") || input.includes("自愈") || input.includes("动力")) {
        sourceSystem = "异常处理系统-Others";
      } else if (input.includes("录像") || input.includes("监控") || input.includes("CCTV") || input.includes("回展") || input.includes("回放") || input.includes("调阅") || input.includes("视频")) {
        sourceSystem = "查询录像审批流程";
      } else if (input.includes("借还") || input.includes("借机") || input.includes("还机") || input.includes("零部件") || input.includes("备件") || input.includes("探仪") || input.includes("零配")) {
        sourceSystem = "借还机申请";
      } else if (input.includes("buyoff") || input.includes("Buyoff") || input.includes("复产") || input.includes("大修") || input.includes("释放")) {
        sourceSystem = "buyoff流程";
      } else if (input.includes("2代") || input.includes("失效分析") || input.includes("电镜") || input.includes("切片") || input.includes("FA") || input.includes("SEM") || input.includes("KLA")) {
        sourceSystem = "2代分析系统";
      } else if (input.includes("物料报废") || input.includes("危化品") || input.includes("报废") || input.includes("销账") || input.includes("过期") || input.includes("环境安全")) {
        sourceSystem = "物料报废";
      } else if (input.includes("弹夹") || input.includes("密封盒") || input.includes("FOUP") || input.includes("容器") || input.includes("领用")) {
        sourceSystem = "自由弹夹领用";
      } else if (input.includes("MES") || input.includes("流片") || input.includes("工单" ) || input.includes("投片")) {
        sourceSystem = "MES系统";
      } else if (input.includes("OA") || input.includes("审批") || input.includes("呈批") || input.includes("维保")) {
        sourceSystem = "OA系统";
      } else if (input.includes("WMS") || input.includes("化学物") || input.includes("特气") || input.includes("酸液")) {
        sourceSystem = "WMS系统";
      } else if (input.includes("EAP") || input.includes("指令") || input.includes("机台") || input.includes("漏洞")) {
        sourceSystem = "EAP系统";
      } else if (input.includes("SPC") || input.includes("量测") || input.includes("超差")) {
        sourceSystem = "SPC系统";
      }

      // 3. Category Determination
      let category = "其他业务";
      if (input.includes("协调") || input.includes("订单") || input.includes("交期") || input.includes("沟通")) {
        category = "订单协调";
      } else if (input.includes("警报") || input.includes("告警") || input.includes("超限") || input.includes("异常")) {
        category = "故障警报";
      } else if (input.includes("安全") || input.includes("合规") || input.includes("EHS") || input.includes("环保") || input.includes("整改") || input.includes("国家")) {
        category = "安全合规";
      } else if (input.includes("采购") || input.includes("维保") || input.includes("加急款") || input.includes("资金") || input.includes("付款")) {
        category = "大额审批";
      }

      // 4. Priority Determination
      let priority: "high" | "medium" | "low" = "medium";
      if (input.includes("特急") || input.includes("高危") || input.includes("红色") || input.includes("重灾") || input.includes("中断") || input.includes("泄漏") || input.includes("加急3.5万") || input.includes("生死红线")) {
        priority = "high";
      } else if (input.includes("延期") || input.includes("自查") || input.includes("例行") || input.includes("常规")) {
        priority = "low";
      }

      // 5. Due Date Calculation
      let dueDate = "2026-06-13"; // default tomorrow+1
      if (input.includes("今日") || input.includes("下班前") || input.includes("12小时") || input.includes("小时内") || input.includes("极速")) {
        dueDate = "2026-06-11";
      } else if (input.includes("明日") || input.includes("1天内") || input.includes("本周五") || input.includes("周五") || input.includes("限时")) {
        dueDate = "2026-06-12";
      } else if (input.includes("2天") || input.includes("两天")) {
        dueDate = "2026-06-13";
      } else if (input.includes("3天") || input.includes("三天")) {
        dueDate = "2026-06-14";
      }

      // 6. Urgency Explanation
      let urgencyExplanation = "本地自愈规则引擎根据芯片Fab厂业务安全红线 and 时效性要求，自动判定了该项制程待办的优先级与要求时限。";
      if (priority === "high") {
        urgencyExplanation = "本地自愈规则引擎研判：由于涉及关键高精密设备在线状态、重大客户交期风险、危化安全或者良率合规红线，本工作已自动提级至Hot Run最高优先级应对。";
      } else if (priority === "low") {
        urgencyExplanation = "本地自愈规则引擎研判：属于日常厂内生产例行折旧申报、化学原料例行测试、一般备忘，时效平缓。";
      }

      // 7. Action Steps Generation
      let actionSteps: string[] = [];
      if (sourceSystem === "异常物料处理系统") {
        actionSteps = [
          "核对异常在制品批次晶圆(Wafer Lot)物理槽位，确保已在MRB中锁定阻止继续流片",
          "在MES/MRB系统中校验缺陷探查探头报文，核定表面裂纹或颗粒污染面积占比范围",
          "线上派发会签单至工艺专家赵磊，评估本批晶圆是物理化学降级复片还是强制性报废"
        ];
      } else if (sourceSystem === "异常处理系统-Others") {
        actionSteps = [
          "调取非标厂务、环境或二次配管压力传感器瞬时数据，排查是否有细微气阀微泄漏",
          "核对环境传感器安全检测协议，远程下发配管气动闸门高敏自愈关断指令包",
          "派驻现场运维人员到特气主管路和防灾防爆池进行实地打压测量并回传签认单"
        ];
      } else if (sourceSystem === "查询录像审批流程") {
        actionSteps = [
          "查验申请人提交的防尘/洁净红线区域CCTV监控调阅范围和回溯时间戳合理性",
          "核定调阅监控涉及的具体ASML光刻区物理工位编号，校验信息保密特权身份",
          "线上流转高密电签批复单，向后线工程师发放单次受控的监控提取 and 回放凭证"
        ];
      } else if (sourceSystem === "借还机申请") {
        actionSteps = [
          "检索仓储高精备件库，定位申请调拨的扫描仪双工台精密微调精密零配件",
          "验证现场测试工装机位就绪度，确认借用期间精密零件不会产生任何物理擦伤",
          "手工建立48小时限流流转账期并出单，等待领用工程师物理领料刷卡打卡"
        ];
      } else if (sourceSystem === "buyoff流程") {
        actionSteps = [
          "确认重修/大修完毕的ASML光刻或刻蚀机台已经过多批次测试晶圆试流片验证",
          "拉取SPC临界值线宽良率在控(WeCo UCL)的物理报告，确保没有持续性系统误差",
          "由品质部门、制程专家线上联合会签判定安全通过，在看板中下发机台绿灯释放令"
        ];
      } else if (sourceSystem === "2代分析系统") {
        actionSteps = [
          "针对失效分析(FA)提报，安排KLA扫描电镜对目标切片微米级电路层进行深度测绘",
          "通过大模型高维缺陷库比对离子刮擦或热解污染形态，提领特征分析码",
          "汇总高保真切片特征报告并生成系统可读的高维决策矩阵，供一期厂长工艺改良参考"
        ];
      } else if (sourceSystem === "物料报废") {
        actionSteps = [
          "验证报废物料(如过期恒温光刻胶)的实物称重及出入库扫码条目是否账实完全相符",
          "启动危化品EHS安全闭环等保流程，锁定特定物料的特气危险自消气阀参数",
          "财务核准资产折旧损失额度并记录线上双因子销账，派发环保公司交接文底"
        ];
      } else if (sourceSystem === "自由弹夹领用") {
        actionSteps = [
          "在弹夹中枢中检索洁净度测试达到0.01颗粒度标准的空闲FOUP密封传送箱",
          "校验申请领用人员所属的制程划区及洗消批次，下发物位出库锁限指示",
          "生成去向绑定指引并在现场容器物理刷卡标签上同步最新派工条码"
        ];
      } else if (sourceSystem === "MES系统") {
        actionSteps = [
          "核对制程中该异构源系统上送的异常待办，关联对应的负责研发专家",
          "开启晶圆在线缺陷检查并联动拦截指令，确保当前批次(Wafer Lot)流转状态对齐大盘",
          "修改配方(Recipe)及工艺制程锁，并通知现场工艺负责人线上签核确认"
        ];
      } else if (sourceSystem === "OA系统") {
        actionSteps = [
          "发起大额加急采购流程，直接进入财务部VP及厂长主管的多副本核批通道进行最终签字",
          "配合物料工程师和原厂ASML/KLA进行支付款项，并比对出关通箱备件单库备",
          "核对设备零配与精密零件采购呈批案，保证高精密制程备品周期"
        ];
      } else if (sourceSystem === "WMS系统") {
        actionSteps = [
          "检索仓储特气化学品、超高纯氟氮材料到港报关 COA 原始进项凭底",
          "确认高气敏剧毒物料的 EHS 安全和等保销账动作执行状况",
          "财务核准退账金额、比对入库物理数量，多渠道消除高负荷挂账"
        ];
      } else if (sourceSystem === "EAP系统") {
        actionSteps = [
          "调取精密机台(如ASML光刻机、刻蚀机)最新的物理传感器快照，包括硅片测试探头腔室温湿度与压力",
          "核对高精密接口协议 SECS/GEM 的连线握手报文，排除高危断连或者网卡物理加密证书失效风险",
          "执行远程网口握手对齐测试，下发自愈恢复重拨指令，保障主传送机械手卡扣与机台运行恢复绿态"
        ];
      } else if (sourceSystem === "SPC系统") {
        actionSteps = [
          "调阅该工艺节点(如涂布显影、减压刻蚀)最新膜厚精度与极限线宽CD均值极差监控看板，定位漂移异常源",
          "校验 SPC 超差控制界限(UCL/LCL)是否发生高偏差位移，排除少数由于刮擦引起的假性边缘波峰点",
          "更新 SPC 监控拦截阀值上限，生成失控故障分析备忘录同步抄送给后线缺陷工艺专家"
        ];
      } else {
        actionSteps = [
          "对照 EHS 厂区危险防灾要求对高危特气化学品防爆罐、液氮恒温冷舱与自动气阀泄放参数进行逐项核准",
          "下发冷链加压及应急高纯化学气瓶增订派料表，对报关税收核销文单进行一键签字，避免关键制程断链",
          "整理本次危化气体微漏自阻断与环境溢出控制报告在系统中建档备案，排除洁净车间环境二次偏离隐患"
        ];
      }

      res.json({
        title,
        priority,
        category,
        sourceSystem,
        dueDate,
        description: input,
        actionSteps,
        urgencyExplanation
      });
    } catch (error: any) {
      console.error("Local rule parse error:", error);
      res.status(500).json({
        error: error.message || "本地规则解析引擎发生未知异常"
      });
    }
  });

  // Serve static assets and mount Vite dev server in non-production
  if (process.env.NODE_ENV !== "production") {
    console.log("Loading Vite dev middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`自愈待办运维中心本地逻辑服务器已就绪：http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("启动失败:", err);
});
