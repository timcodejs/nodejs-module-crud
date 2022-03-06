const sendit = () => {
    const userid = document.regiform.userid;
    if (userid.value == '') {
        alert('아이디를 입력해주세요.');
        userid.focus();
        return false;
    }

    const userpw = document.regiform.userpw;
    if (userpw.value == '') {
        alert('비밀번호를 입력해주세요.');
        userpw.focus();
        return false;
    }

    const username = document.regiform.name;
    if (username.value == '') {
        alert('이름을 입력해주세요.');
        username.focus();
        return false;
    }

    const expNameText = /[가-힣]+$/;
    if (!expNameText.test(username.value)) {
        alert("이름 형식을 확인하세요. 한글만 입력하세요.");
        username.focus();
        return false;
    }

    return true;
}

const logoutBtn = () => {
    let result = confirm('로그아웃 하시겠습니까?');

    if(result) {
        return true;
    } else {
        return false;
    }
}