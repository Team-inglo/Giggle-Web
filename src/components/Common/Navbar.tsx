import { useLocation, useNavigate } from 'react-router-dom';
import { useUserStore } from '@/store/user';
import { UserType } from '@/constants/user';
import { employerRoutes, userRoutes, guestRoutes } from '@/constants/routes';
import Icon from '@/components/Common/Icon';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { account_type } = useUserStore();

  // 현재 경로에 따라 아이콘 색상 클래스 이름의 접미사를 반환합니다.
  const getIconColorSuffix = (path: string) => {
    return location.pathname === path ? 'neutral-900' : 'neutral-400';
  };

  // 공통 렌더링 함수
  const renderNavItems = (routes: typeof userRoutes) =>
    routes.map((route, index) => {
      const IconComponent = route.svg;
      return (
        <button
          key={index}
          onClick={() => navigate(route.path)}
          className="flex flex-col items-center justify-center w-[3.125rem] h-[3.125rem] whitespace-nowrap"
        >
          <div className="w-[1.375rem] h-[1.375rem] flex items-center justify-center">
            <Icon
              icon={IconComponent}
              fillColor={`text-${getIconColorSuffix(route.path)}`}
              className="w-[1.375rem] h-[1.375rem] flex items-center justify-center"
            />
          </div>
          {/* 텍스트도 강조 색상 조건부 처리 */}
          {route.label && (
            <span
              className={`flex flex-start caption-11-regular h-[0.9375rem] ${
                location.pathname === route.path
                  ? 'text-text-normal'
                  : 'text-text-alternative'
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
      <section
        className="
          fixed bottom-0 w-full
          bg-surface-base border-t-[0.03125rem] border-border-disabled
           pt-[0.0625rem] pb-[2.125rem] px-4
           "
      >
        <div className="flex items-center justify-between">
          {renderNavItems(routes)}
        </div>
      </section>
    </div>
  );
};

export default Navbar;
