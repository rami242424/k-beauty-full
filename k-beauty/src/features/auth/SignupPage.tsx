import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signupApi } from "../../api/auth";

export default function SignupPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");

    try {
      setLoading(true);
      await signupApi(email, name, pw);
      alert("회원가입이 완료되었습니다. 로그인해 주세요.");
      navigate("/login");
    } catch (e: any) {
      setErr(e.message || "회원가입에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-2xl border shadow-sm p-6 bg-white">
        <h1 className="text-2xl font-bold">회원가입</h1>
        <form className="mt-6 space-y-4" onSubmit={onSubmit}>
          <div>
            <label className="text-sm text-gray-600">이메일</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-xl border px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="text-sm text-gray-600">이름</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded-xl border px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="text-sm text-gray-600">비밀번호</label>
            <input
              type="password"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              className="mt-1 w-full rounded-xl border px-3 py-2"
              required
            />
          </div>
          {err && <p className="text-sm text-red-600">{err}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-black text-white py-2.5 font-medium"
          >
            {loading ? "가입 중..." : "회원가입"}
          </button>
        </form>
        <div className="mt-6 text-sm text-gray-600">
          이미 계정이 있으신가요?{" "}
          <Link to="/login" className="text-brand-600">
            로그인
          </Link>
        </div>
      </div>
    </div>
  );
}
