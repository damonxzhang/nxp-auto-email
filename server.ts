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

      const input = text.trim();
      const refDate = currentDate || "2026-06-11";

      // 1. Title Resolution (Extract text in brackets, or first significant line)
      let title = "微服务协同流程指令";
      const bracketMatch = input.match(/【([^】]+)】/);
      if (bracketMatch) {
        // If there's a brackets area, try to combine it with some keywords
        const bracketContent = bracketMatch[1];
        const remainingText = input.replace(/【[^】]+】/, "").trim();
        const cleanRemaining = remainingText.slice(0, 18).replace(/[，。；：]/g, "");
        title = `${bracketContent}：${cleanRemaining}`;
      } else {
        title = input.slice(0, 22).replace(/[，。；：]/g, "") + "...";
      }

      // 2. Source System Determination
      let sourceSystem = "OA系统";
      if (input.includes("监控系统") || input.includes("宿主机") || input.includes("告警") || input.includes("K8s") || input.includes("崩溃") || input.includes("宕机")) {
        sourceSystem = "监控系统";
      } else if (input.includes("CRM") || input.includes("PayPal") || input.includes("客户") || input.includes("客诉") || input.includes("工单")) {
        sourceSystem = "CRM系统";
      } else if (input.includes("邮件") || input.includes("等保") || input.includes("机要") || input.includes("跳板机") || input.includes("安全")) {
        sourceSystem = "核心邮箱";
      } else if (input.includes("OA") || input.includes("流程") || input.includes("审批") || input.includes("预算")) {
        sourceSystem = "OA系统";
      }

      // 3. Category Determination
      let category = "流程协同";
      if (input.includes("审批") || input.includes("签批") || input.includes("签字")) {
        category = "大数审批";
      } else if (input.includes("警警") || input.includes("监控") || input.includes("告警") || input.includes("异常") || input.includes("宕机") || input.includes("崩溃")) {
        category = "故障警报";
      } else if (input.includes("客诉") || input.includes("客情") || input.includes("工单") || input.includes("PayPal") || input.includes("退款")) {
        category = "客户工单";
      } else if (input.includes("等保") || input.includes("安全") || input.includes("协查") || input.includes("加固")) {
        category = "合规整改";
      } else {
        category = "临时自愈";
      }

      // 4. Priority Determination
      let priority = "medium";
      const hasHighKeywords = ["崩溃", "宕机", "紧急", "大客户", "安全", "等保", "特急", "泄露", "公安", "特办", "资损", "paypal", "mfa", "暴力破解", "ssh"].some(kw => input.toLowerCase().includes(kw));
      const hasLowKeywords = ["例行", "日常", "周报", "普通", "归档", "一般"].some(kw => input.toLowerCase().includes(kw));
      if (hasHighKeywords) {
        priority = "high";
      } else if (hasLowKeywords) {
        priority = "low";
      }

      // 5. Due Date Calculation
      let dueDate = "2026-06-13"; // default tomorrow+1
      if (input.includes("今日") || input.includes("下班前") || input.includes("12小时") || input.includes("特急")) {
        dueDate = "2026-06-11";
      } else if (input.includes("明日") || input.includes("1天内") || input.includes("本周五") || input.includes("周五")) {
        dueDate = "2026-06-12";
      } else if (input.includes("2天") || input.includes("两天")) {
        dueDate = "2026-06-13";
      } else if (input.includes("3天") || input.includes("三天")) {
        dueDate = "2026-06-14";
      }

      // 6. Urgency Explanation
      let urgencyExplanation = "本地自愈规则引擎根据系统设定的业务安全红线和时效性要求，自动判定了该项工作的优先级与要求时限。";
      if (priority === "high") {
        urgencyExplanation = "本地自愈规则引擎研判：由于涉及核心生产健康状态、关键客户体验或者资金/合规红线，本工作已自动提级至特急最高优先级应对。";
      } else if (priority === "low") {
        urgencyExplanation = "本地自愈规则引擎研判：属于日常例行建档、一般工作汇报或低危记录，设定的交付时效平缓。";
      }

      // 7. Action Steps Generation
      let actionSteps: string[] = [];
      if (category === "大数审批" || sourceSystem === "OA系统") {
        actionSteps = [
          "核对本次申请对应预算水位与历史申请单据凭证之关联度，防止超占及重复申报",
          "督促相关归口负责人及审批专家进行线上一键签字，确保审批全链路凭证留痕",
          "汇总审批结果和备用预算调配额度，向申报部门进行信息通达及公开发放"
        ];
      } else if (category === "故障警报" || sourceSystem === "监控系统") {
        actionSteps = [
          "拉取宿主机或对应微服务集群当前 CPU / 内存及 IO 监控快照进行对比",
          "核对本次服务日志中的异常错误堆栈，排除第三方数据库连接或内存溢出引发的代码因素",
          "执行多副本紧急自动扩容或热修复热更新，验证自愈机制后的各系统指标是否恢复健康"
        ];
      } else if (category === "客户工单" || sourceSystem === "CRM系统") {
        actionSteps = [
          "联系工单申报人核实详细的重现故障路径，调阅日志提取具体的连接返回报错代码",
          "登录对应专属接口通信网关拉取接口报文，核定商户状态及 PayPal 等付款密钥指纹",
          "进行接口断连补救连接测试，保障生产链路稳定并主动协调用户进行二次付款动作"
        ];
      } else {
        actionSteps = [
          "对照网络安全及保密协查要求对企业暴露云跳板机、堡垒机或边缘端口进行集中核查",
          "下发对应的端口屏蔽策略，并在防火墙层阻断异常恶意探测，加强多因子双重验证安全等级",
          "整理本次自愈防护跟进报告并在中枢备案归档，将隐患彻底阻断消除"
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
