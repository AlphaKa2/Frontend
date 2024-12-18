const Terms_Service_Page = () => {
  return (
    <div style={{ padding: "20px", lineHeight: "1.6" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        서비스 이용약관
      </h1>

      <section style={{ marginBottom: "20px"
      }}>
      <h2>제 1 조 (목적)</h2>
      <p>
        본 약관은 온길(이하 “회사”)이 제공하는 트리플 및 트리플
        관련 제반 서비스의 이용과 관련하여 회사와 이용자와의 권리, 의무 및
        책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
      </p>
    </section>

    <section style={{ marginBottom: "20px" }}>
      <h2>제 2 조 (정의)</h2>
      <p>본 약관에서 사용하는 용어의 정의는 다음과 같습니다.</p>
      <ul>
        <li>
          <strong>“서비스”</strong>: 트리플이 제공하는 여행 정보 플랫폼 관련
          서비스로서, 구현되는 단말기와 상관없이 이용할 수 있는 제반
          서비스를 의미합니다.
        </li>
        <li>
          <strong>“이용자”</strong>: 회사의 “서비스”에 접속하여 본 약관에 따라
          서비스를 이용하는 회원 및 비회원.
        </li>
        <li>
          <strong>“회원”</strong>: 회사와 이용계약을 체결하고 서비스를 이용하는
          고객.
        </li>
        <li>
          <strong>“비회원”</strong>: 회원가입 없이 서비스를 이용하는 고객.
        </li>
        <li>
          <strong>“아이디(ID)”</strong>: 회원의 식별과 서비스 이용을 위해
          설정한 전자우편 주소.
        </li>
        <li>
          <strong>“비밀번호”</strong>: 회원임을 확인하고 비밀을 보호하기 위해
          설정한 문자 또는 숫자의 조합.
        </li>
      </ul>
    </section>

    <section style={{ marginBottom: "20px" }}>
      <h2>제 3 조 (약관의 게시와 개정)</h2>
      <p>
        “회사”는 본 약관의 내용과 상호 및 대표자 성명, 영업소 소재지 주소,
        전화번호, 팩스번호, 전자우편 주소 등을 이용자가 쉽게 알 수 있도록
        서비스 초기 화면 또는 별도의 연결화면에 게시합니다.
      </p>
      <p>
        회사는 관련 법령에 따라 약관을 개정할 수 있으며, 개정된 약관은
        적용일자와 개정사유를 명시하여 최소 7일 이전에 공지합니다.
      </p>
    </section>

    <section style={{ marginBottom: "20px" }}>
      <h2>제 4 조 (이용계약 체결)</h2>
      <p>
        이용계약은 회원가입 신청자가 약관에 동의하고, 회사가 신청을 승낙함으로써
        체결됩니다.
      </p>
      <ul>
        <li>가입 신청자는 허위 정보 기재가 없어야 합니다.</li>
        <li>
          회사는 14세 미만의 아동의 회원가입을 제한하며, 기타 법령 위반 시
          승낙하지 않을 수 있습니다.
        </li>
      </ul>
    </section>

    <section style={{ marginBottom: "20px" }}>
      <h2>제 5 조 (회원정보의 변경)</h2>
      <p>
        회원은 개인정보 관리 화면을 통해 본인의 개인정보를 열람하고 수정할 수
        있습니다. 단, 서비스 관리를 위해 필요한 아이디 등은 수정할 수 없습니다.
      </p>
    </section>

    <section style={{ marginBottom: "20px" }}>
      <h2>제 6 조 (개인정보보호 의무)</h2>
      <p>
        회사는 정보통신망법 등 관계 법령에 따라 이용자의 개인정보를 보호하기
        위해 노력합니다. 자세한 내용은 개인정보처리방침을 따릅니다.
      </p>
    </section>

    <section style={{ marginBottom: "20px" }}>
      <h2>제 7 조 (회원의 아이디 및 비밀번호 관리에 대한 의무)</h2>
      <p>
        회원은 본인의 아이디와 비밀번호를 제3자에게 공유하지 않도록 관리해야
        하며, 도용이 발생한 경우 즉시 회사에 통지해야 합니다.
      </p>
    </section>

    <section style={{ marginBottom: "20px" }}>
      <h2>제 8 조 (이용자의 금지행위)</h2>
      <ul>
        <li>회사의 서비스를 이용한 불법 행위.</li>
        <li>타인의 개인정보 도용.</li>
        <li>허위 정보 기재 및 계약 체결.</li>
        <li>회사의 저작권 및 지식재산권 침해.</li>
      </ul>
    </section>

    <section style={{ marginBottom: "20px" }}>
      <h2>제 9 조 (회사의 의무)</h2>
      <p>
        회사는 관련 법령에 따라 이용자의 개인정보를 보호하고, 안정적으로
        서비스를 제공하기 위해 노력합니다.
      </p>
    </section>

    <footer style={{ textAlign: "center", marginTop: "40px" }}>
      <p>이 약관은 2024년 11월 25일부터 적용됩니다.</p>
      <p>
        이전 약관은{" "}
        <a
          href="/previous-terms"
          style={{ color: "blue", textDecoration: "underline" }}
        >
          여기
        </a>
        에서 확인할 수 있습니다.
      </p>
    </footer>
  </div>
);
};

export default Terms_Service_Page;
