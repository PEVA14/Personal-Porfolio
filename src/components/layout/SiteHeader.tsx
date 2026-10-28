import { NavBar } from "@/components/navigation/NavBar";
import { profile } from "@/content/profile";
import { publicAssetExists } from "@/lib/assets";
import { getDictionary, localePath } from "@/lib/i18n";

export async function SiteHeader() {
  const { locale, t } = await getDictionary();
  const home = localePath(locale);

  return (
    <NavBar
      locale={locale}
      homeHref={home}
      links={[
        { href: `${home}#work`, label: t.nav.work },
        { href: `${home}#experience`, label: t.nav.experience, secondary: true },
        { href: `${home}#about`, label: t.nav.about },
        { href: `${home}#contact`, label: t.nav.contact, secondary: true },
      ]}
      cv={publicAssetExists(profile.cv.path) ? profile.cv.path : null}
      labels={{
        name: profile.name,
        role: t.hero.role,
        menu: t.a11y.menu,
        close: t.a11y.close,
        cv: t.nav.cv,
        home: t.a11y.home,
        primaryNav: t.a11y.primaryNav,
        openMenu: t.a11y.openMenu,
        closeMenu: t.a11y.closeMenu,
        themeToLight: t.a11y.themeToLight,
        themeToDark: t.a11y.themeToDark,
        language: t.a11y.language,
        switchTo: t.a11y.switchTo,
        newTab: t.a11y.newTab,
        cvUnavailable: t.a11y.cvUnavailable,
      }}
    />
  );
}
