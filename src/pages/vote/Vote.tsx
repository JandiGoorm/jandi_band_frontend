import DefaultLayout from "@/layouts/defaultLayout/DefaultLayout";

const Vote = () => {
  return (
    <DefaultLayout>
      <main>
        <header>
          <h1>5월 대동제 곡 투표</h1>
          <section>
            <button>결과보기</button>
            <button>곡 추가</button>
            <button>공유하기</button>
          </section>
        </header>
      </main>
    </DefaultLayout>
  );
};

export default Vote;
