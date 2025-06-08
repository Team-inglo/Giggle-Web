import { useLocation, useNavigate } from 'react-router-dom';
import { useUserStore } from '@/store/user';
import { UserType } from '@/constants/user';
import { employerRoutes, userRoutes, guestRoutes } from '@/constants/routes';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { account_type } = useUserStore();

  // 현재 경로와 일치하면 강조 색상 (진하게), 아니면 흐리게
  const getIconFilter = (path: string) => {
    return location.pathname === path
      ? 'brightness(0) saturate(100%)' // 진한 검정 계열
      : 'brightness(0) saturate(0%) opacity(0.4)'; // 연하게 흐린 회색
  };

  // 공통 렌더링 함수
  const renderNavItems = (routes: typeof userRoutes) =>
    routes.map((route, index) => {
      const IconComponent = route.svg;
      return (
        <button
          key={index}
          onClick={() => navigate(route.path)}
          className="flex flex-col items-center gap-1"
        >
          {/* SVG 색상 조절 대신 filter 속성으로 흑백 조절 */}
          <IconComponent
            className="w-6 h-6"
            style={{ filter: getIconFilter(route.path) }}
          />
          {/* 텍스트도 강조 색상 조건부 처리 */}
          {route.label && (
            <span
              className={`text-xs ${
                location.pathname === route.path
                  ? 'text-[#1E1926]'
                  : 'text-[#DCDCDC]'
              }`}
            >
              {route.label}
            </span>
          )}
        </button>
      );
    });

  // 사용자 유형에 따라 적절한 라우트 선택
  const routes =
    account_type === UserType.USER
      ? userRoutes
      : account_type === UserType.OWNER
        ? employerRoutes
        : guestRoutes;

  return (
    <div className="z-50 flex items-center justify-center">
      <section className="fixed bottom-0 w-full pt-6 pb-10 px-12 bg-navbarGradient rounded-t-[2rem]">
        <div className="flex items-center justify-between">
          {renderNavItems(routes)}
        </div>
      </section>
    </div>
  );
};

export default Navbar;
