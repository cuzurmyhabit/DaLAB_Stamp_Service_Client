import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Login } from "../lib/auth";
import '../App.css'

export default function LoginPage() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginFail, setLoginFail] = useState(false);

    const handleLoginSubmit = async (e) => {
        e.preventDefault();

        const { data, error } = await Login(email, password);
        if (error) {
            setLoginFail(true);
            console.error("로그인 실패:", error.message);
            alert("로그인 실패: " + error.message);
            return;
        }
        console.log("로그인 성공", data);
        navigate("/receiver");
    };

    return (
        <div className="w-screen min-h-screen flex items-center justify-center bg-background">
            <div className="w-full h-[calc(100vh-6rem)] bg-white rounded-4xl ml-12 mr-12 flex flex-col items-center justify-top box-border">
                <div className="h-15 w-35 bg-[url('/assets/images/airplane.png')] bg-cover bg-top mb-6 mt-21 flex"></div>
                <div className='flex text-2xl text-center mb-25'>
                    <div className='font-semibold'>Stamp Marble</div>
                    <div className='font-light'>에 오신 것을 환영합니다!</div>
                </div>
                <form onSubmit={handleLoginSubmit} action="" className='flex flex-col items-center mb-8'>
                    <input
                        type="email"
                        placeholder='email'
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        // className="border w-80 h-10 p-5 rounded-full box-border mb-5 bg-[url('/assets/images/majesticons_mail-line.png')] bg-no-repeat bg-size-[1.2rem_1.2rem] bg-position-[right_1rem_center] pr-10"
                        className={
                            "border w-80 h-10 p-5 rounded-full mb-5 pr-10 " +
                            (loginFail
                              ? "border-fail text-fail bg-[url('/assets/images/majesticons_mail-line_red.png')]"
                              : "border-normal bg-[url('/assets/images/majesticons_mail-line.png')]"
                            )
                        }
                    />
                    <input
                        type="password"
                        placeholder='password'
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        // className="border w-80 h-10 p-5 rounded-full box-border mb-15 bg-[url('/assets/images/prime_lock.png')] bg-no-repeat bg-size-[1.2rem_1.2rem] bg-position-[right_1rem_center] pr-10"
                        className={
                            "border w-80 h-10 p-5 mb-3 rounded-full pr-10 " +
                            (loginFail
                              ? "border-fail text-fail bg-[url('/assets/images/prime_lock_red.png')]"
                              : "border-normal bg-[url('/assets/images/prime_lock.png')]"
                            )
                        }
                    />
                    {loginFail && (
                    <div className="w-80 flex justify-end">
                        <div className="mb-2 text-fail text-xs font-medium">
                            * 아이디 / 비밀번호를 확인해주세요.
                         </div>
                    </div>)}
                    <button
                        type='submit'
                        className='w-80 h-10 p-5 rounded-full bg-background text-white flex items-center justify-center shadow-background shadow-xl/15 font
                    '>log in</button>
                </form>
                <div onClick={()=>navigate('/signup')}>create an account</div>
            </div>
        </div>
    );
}
