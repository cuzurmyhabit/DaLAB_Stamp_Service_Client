import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Signup } from "../lib/auth";

export default function SignupPage() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    
    // 역할: true는 Receiver(User), false는 Giver
    const [isUser, setIsUser] = useState(false); 

    const [passwordMismatch, setPasswordMismatch] = useState(false);
    const [signupError, setSignupError] = useState(null);

    const handleSignupSubmit = async (e) => {
        e.preventDefault();
        setPasswordMismatch(false);
        setSignupError(null);

        if (password !== rePassword) {
            setSignupError("* 비밀번호가 같지 않습니다.");
            setPasswordMismatch(true);
            return;
        }

        const { error } = await Signup(
            email,
            password,
            name,
            isUser
        );

        if (error) {
            // Supabase 오류 메시지
            setSignupError(`회원가입 오류: ${error.message}`);
            return;
        }

        setSignupError("회원가입에 성공했습니다!");
        setTimeout(() => {
             navigate("/login");
        }, 1000);
       
    };

    const handleRoleToggle = (roleIsUser) => {
        setIsUser(roleIsUser);
    }
    
    // passwordMismatch 상태를 사용하여 폼 아래에 경고 메시지를 표시할 수도 있지만,
    // 일관성을 위해 모달 사용을 권장합니다.

    return (
        <div className="w-screen min-h-screen flex items-center justify-center bg-background">
            <div className="w-full h-[calc(100vh-6rem)] bg-white rounded-4xl ml-12 mr-12 flex flex-col items-center justify-start box-border">
                <div className='w-full flex justify-start'>
                    <button 
                        onClick={() => navigate('/login')} 
                        className="w-6 h-9 bg-[url('/assets/images/back.png')] bg-cover ml-40 mt-12"
                        aria-label="뒤로 가기"
                    ></button>
                </div>
                <div className="h-15 w-35 bg-[url('/assets/images/airplane.png')] bg-cover bg-top mb-6 flex"></div>
                <div className='flex text-2xl text-center mb-8'>
                    <div className='font-light text-background'>회원가입</div>
                </div>
                <form onSubmit={handleSignupSubmit} className='flex flex-col items-center mb-8'>
                    <input 
                        type="email" 
                        placeholder='email' 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="border w-80 h-10 p-5 rounded-full box-border bg-[url('/assets/images/majesticons_mail-line.png')]
                        bg-no-repeat bg-size-[1.2rem_1.2rem] bg-position-[right_1rem_center] pr-10 mb-4" />

                    <input 
                        type="text" 
                        placeholder='name' 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="border w-80 h-10 p-5 mb-4 rounded-full box-border bg-[url('/assets/images/hugeicons_user-03.png')]
                        bg-no-repeat bg-size-[1.2rem_1.2rem] bg-position-[right_1rem_center] pr-10" />

                    <input 
                        type="password" 
                        placeholder='password (최소 6자)' 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="border w-80 h-10 p-5 rounded-full box-border bg-[url('/assets/images/prime_lock.png')] bg-no-repeat bg-size-[1.2rem_1.2rem] 
                        bg-position-[right_1rem_center] pr-10 mb-4" />

                    <input 
                        type="password" 
                        placeholder='re-enter-password' 
                        value={rePassword}
                        onChange={(e) => setRePassword(e.target.value)}
                        required
                        className="border border-background w-80 h-10 p-5 mb-4 rounded-full box-border bg-[url('/assets/images/prime_lock.png')] bg-no-repeat bg-size-[1.2rem_1.2rem] 
                        bg-position-[right_1rem_center] pr-10" />
                    
                    {passwordMismatch && (
                        <div className="w-80 text-right text-fail text-xs mb-3">
                            * 비밀번호가 같지 않습니다.
                        </div>
                    )}
                    
                    <div className='flex mb-4'>
                        {/* GIVER (isUser: false) */}
                        <div 
                            className={`w-38 h-12 items-center flex justify-center rounded-full border mr-3 font-semibold cursor-pointer
                            ${!isUser ? 'bg-background text-white' : 'bg-white text-background'}`} 
                            onClick={() => handleRoleToggle(false)} 
                        >giver</div>
                        
                        {/* RECEIVER (isUser: true) */}
                        <div 
                            className={`w-38 h-12 items-center flex justify-center rounded-full border font-semibold cursor-pointer
                            ${isUser ? 'bg-background text-white' : 'bg-white text-background'}`} 
                            onClick={() => handleRoleToggle(true)} 
                        >receiver</div>
                    </div>
                    <button type='submit' className='w-80 h-10 p-5 text-1.5xl rounded-full bg-background text-white flex items-center justify-center shadow-blue-500 shadow-xl/15 font'>create an account</button>
                </form>
            </div>
        </div>
    );
}