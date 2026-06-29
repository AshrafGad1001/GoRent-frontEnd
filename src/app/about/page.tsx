'use client';

import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import { alpha } from "@mui/material/styles";
import Link from "next/link";

// Icons for Values
import SecurityIcon from "@mui/icons-material/Security";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";

// Icons for Why Choose Us
import SearchIcon from "@mui/icons-material/Search";
import InfoIcon from "@mui/icons-material/Info";
import LockIcon from "@mui/icons-material/Lock";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

// Icons for Stats
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import PersonIcon from "@mui/icons-material/Person";
import GroupsIcon from "@mui/icons-material/Groups";
import StarRateIcon from "@mui/icons-material/StarRate";

export default function AboutPage() {
  const values = [
    { title: "الثقة", description: "نبني علاقات طويلة الأمد تعتمد على المصداقية والنزاهة في كل تعاملاتنا.", icon: <SecurityIcon fontSize="large" color="primary" /> },
    { title: "الشفافية", description: "نوفر جميع المعلومات اللازمة بوضوح تام لتسهيل اتخاذ القرارات الصحيحة.", icon: <VisibilityIcon fontSize="large" color="primary" /> },
    { title: "البساطة", description: "نجعل عملية البحث والاستئجار سهلة ومباشرة بدون تعقيدات.", icon: <AutoAwesomeIcon fontSize="large" color="primary" /> },
    { title: "الموثوقية", description: "نضمن دقة وموثوقية كافة العقارات المعروضة على منصتنا.", icon: <VerifiedUserIcon fontSize="large" color="primary" /> },
    { title: "الجودة", description: "نلتزم بتقديم أفضل المعايير لضمان رضا عملائنا في كل خطوة.", icon: <WorkspacePremiumIcon fontSize="large" color="primary" /> },
    { title: "العميل أولاً", description: "نضع احتياجات ورضا عملائنا في صميم كل ما نقوم به.", icon: <SupportAgentIcon fontSize="large" color="primary" /> },
  ];

  const features = [
    { title: "عقارات موثقة", description: "يتم التحقق من كافة العقارات لضمان صحة المعلومات.", icon: <VerifiedUserIcon fontSize="large" sx={{ color: "text.secondary" }} /> },
    { title: "بحث سهل", description: "أدوات بحث متقدمة للوصول إلى العقار المناسب بسرعة.", icon: <SearchIcon fontSize="large" sx={{ color: "text.secondary" }} /> },
    { title: "معلومات واضحة", description: "تفاصيل شاملة عن كل عقار مع صور عالية الجودة.", icon: <InfoIcon fontSize="large" sx={{ color: "text.secondary" }} /> },
    { title: "دعم متواصل", description: "فريق خدمة عملاء متاح لمساعدتك في أي وقت.", icon: <SupportAgentIcon fontSize="large" sx={{ color: "text.secondary" }} /> },
    { title: "تواصل آمن", description: "نظام مراسلة داخلي يحمي خصوصيتك وبياناتك.", icon: <LockIcon fontSize="large" sx={{ color: "text.secondary" }} /> },
    { title: "تجربة مستخدم سلسة", description: "واجهة استخدام سهلة تناسب جميع الأجهزة.", icon: <ThumbUpIcon fontSize="large" sx={{ color: "text.secondary" }} /> },
  ];

  const steps = [
    { step: "1", title: "تصفح العقارات", description: "استكشف مجموعة واسعة من العقارات المتاحة للإيجار." },
    { step: "2", title: "قارن الخيارات", description: "استخدم الفلاتر لمقارنة العقارات واختيار الأنسب لك." },
    { step: "3", title: "تواصل مع المالك", description: "تواصل بشكل مباشر وآمن مع مالك العقار." },
    { step: "4", title: "أتمم عملية الإيجار", description: "اتفق على التفاصيل وأتمم الإيجار بكل سهولة." },
  ];

  const stats = [
    { number: "+500", label: "عقار متاح", icon: <HomeWorkIcon fontSize="large" sx={{ color: "info.main", mb: 2 }} /> },
    { number: "+120", label: "مالك عقار", icon: <PersonIcon fontSize="large" sx={{ color: "info.main", mb: 2 }} /> },
    { number: "+1,500", label: "مستخدم مسجل", icon: <GroupsIcon fontSize="large" sx={{ color: "info.main", mb: 2 }} /> },
    { number: "%95", label: "نسبة رضا العملاء", icon: <StarRateIcon fontSize="large" sx={{ color: "info.main", mb: 2 }} /> },
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default', pb: 5 }}>

      {/* 1. Hero Section */}
      <Box component="section" sx={{ bgcolor: 'background.paper', borderBottom: '1px solid', borderColor: 'divider', pt: 10, pb: 12, px: 2, textAlign: 'center' }}>
        <Container maxWidth="md">
          <Typography variant="h3" sx={{ fontWeight: 'bold', color: 'text.primary', mb: 3, fontSize: { xs: '2.5rem', md: '3.5rem' } }}>
            مرحباً بك في <Typography component="span" variant="h1" sx={{ color: 'primary.main' }}>GoRent</Typography>
          </Typography>
          <Typography variant="h6" sx={{ color: 'text.secondary', mb: 5, maxWidth: 600, mx: 'auto', lineHeight: 1.8 }}>
            المنصة الرائدة لتأجير العقارات في مصر. نحن هنا لنجعل تجربة البحث عن عقار أو تأجيره أسهل، أسرع، وأكثر أماناً.
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, justifyContent: 'center' }}>
            <Box component={Link} href="/" sx={{ textDecoration: 'none' }}>
              <Button variant="contained" size="large" fullWidth sx={{ maxWidth: { sm: 'auto' } }}>
                ابحث عن عقار
              </Button>
            </Box>
            <Box component={Link} href="/contact" sx={{ textDecoration: 'none' }}>
              <Button variant="outlined" size="large" fullWidth sx={{ maxWidth: { sm: 'auto' } }}>
                تواصل معنا
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* 2. About GoRent */}
      <Box component="section" sx={{ py: 10, px: 2 }}>
        <Container maxWidth="lg">
          <Card sx={{ bgcolor: 'background.paper', borderRadius: 2, boxShadow: 1, border: '1px solid', borderColor: 'divider', p: { xs: 4, md: 6 } }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' }, gap: 3, alignItems: 'center' }}>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'text.primary', mb: 3 }}>من نحن ولماذا GoRent؟</Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2, lineHeight: 1.8, fontSize: '1.1rem' }}>
                  GoRent هي منصة عقارية متخصصة تهدف إلى تغيير وتسهيل طريقة استئجار العقارات في المنطقة.
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2, lineHeight: 1.8, fontSize: '1.1rem' }}>
                  تم إنشاء المنصة لحل مشكلة صعوبة العثور على سكن موثوق به والتعامل مع وسطاء عقاريين قد يزيدون من تعقيد العملية. نحن نقضي على الخطوات غير الضرورية ونوفر معلومات شفافة وموثوقة للجميع.
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.8, fontSize: '1.1rem' }}>
                  نحن نساعد كل من المستأجرين وملاك العقارات من خلال ربطهم مباشرة في بيئة آمنة تضمن حقوق الطرفين وتوفر تجربة خالية من المتاعب.
                </Typography>
              </Box>
              <Box sx={(theme) => ({ bgcolor: alpha(theme.palette.info.main, 0.05), borderRadius: 2, p: 4, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' })}>
                <Box sx={{ mb: 4 }}>
                  <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'info.dark', mb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <StarRateIcon /> مهمتنا
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'info.main', lineHeight: 1.8 }}>
                    تمكين الأفراد والعائلات من العثور على منزل أحلامهم بسهولة وشفافية، مع تزويد ملاك العقارات بأدوات متطورة وفعالة لإدارة ممتلكاتهم بأمان.
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'info.dark', mb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <VisibilityIcon /> رؤيتنا
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'info.main', lineHeight: 1.8 }}>
                    أن نصبح المنصة الأولى والأكثر ثقة لإيجار العقارات، حيث يمكن لأي شخص إيجاد مسكن يلبي كافة احتياجاته بنقرة زر واحدة وفي بيئة موثوقة.
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Card>
        </Container>
      </Box>

      {/* 5. Our Core Values */}
      <Box component="section" sx={{ py: 10, bgcolor: 'background.paper', borderTop: '1px solid', borderBottom: '1px solid', borderColor: 'divider', px: 2 }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'text.primary', mb: 2 }}>قيمنا الأساسية</Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 600, mx: 'auto' }}>المبادئ التي نلتزم بها لضمان تقديم أفضل خدمة لعملائنا</Typography>
          </Box>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }, gap: 2 }}>
            {values.map((item, index) => (
              <Card key={index} sx={{ p: 4, textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: 1, border: '1px solid', borderColor: 'divider', transition: 'box-shadow 0.3s', '&:hover': { boxShadow: 4 } }}>
                <Box sx={(theme) => ({ bgcolor: alpha(theme.palette.info.main, 0.08), p: 2, borderRadius: '50%', display: 'inline-flex', mb: 3 })}>
                  {item.icon}
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'text.primary', mb: 1 }}>{item.title}</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>{item.description}</Typography>
              </Card>
            ))}
          </Box>
        </Container>
      </Box>

      {/* 6. Why Choose GoRent & 7. How It Works */}
      <Box component="section" sx={{ py: 10, px: 2 }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' }, gap: 4 }}>
            {/* Why Choose Us */}
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'text.primary', mb: 4 }}>لماذا تختار GoRent؟</Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 1.5 }}>
                {features.map((feature, index) => (
                  <Box key={index} sx={{ display: 'flex', gap: 2 }}>
                    <Box sx={{ mt: 0.5, flexShrink: 0 }}>{feature.icon}</Box>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'text.primary', mb: 0.5 }}>{feature.title}</Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>{feature.description}</Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>

            {/* How It Works */}
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'text.primary', mb: 4 }}>كيف تعمل المنصة؟</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, position: 'relative' }}>
                {/* Vertical Line for Timeline */}
                <Box sx={{ position: 'absolute', top: 24, bottom: 24, right: 24, width: '2px', bgcolor: (theme) => alpha(theme.palette.info.main, 0.2), display: { xs: 'none', sm: 'block' } }} />

                {steps.map((step, index) => (
                  <Box key={index} sx={{ display: 'flex', gap: 3, alignItems: 'flex-start', position: 'relative', zIndex: 1 }}>
                    <Box sx={{ width: 48, height: 48, borderRadius: '50%', bgcolor: 'info.main', color: 'info.contrastText', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.25rem', flexShrink: 0, boxShadow: 2 }}>
                      {step.step}
                    </Box>
                    <Card sx={{ p: 2, flex: 1, bgcolor: 'background.paper', boxShadow: 1, border: '1px solid', borderColor: 'divider' }}>
                      <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'text.primary', mb: 0.5 }}>{step.title}</Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>{step.description}</Typography>
                    </Card>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* 8. Statistics Section */}
      <Box component="section" sx={(theme) => ({
        py: 10,
        bgcolor: theme.palette.mode === 'light'
          ? alpha(theme.palette.text.primary, 0.95)
          : theme.palette.background.default,
        color: theme.palette.mode === 'light'
          ? theme.palette.background.paper
          : theme.palette.text.primary,
        px: 2,
        borderRadius: theme.shape.borderRadius,
        maxWidth: 'lg',
        mx: 'auto',
        width: '100%',
        mb: 5,
        boxShadow: 6,
        overflow: 'hidden'
      })}>
        <Container>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', md: '1fr 1fr 1fr 1fr' }, gap: 2, textAlign: 'center' }}>
            {stats.map((stat, index) => (
              <Box key={index} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {stat.icon}
                <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>{stat.number}</Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 500 }}>{stat.label}</Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* 9. Final Call To Action */}
      <Box component="section" sx={(theme) => ({ py: 10, px: 2, textAlign: 'center', bgcolor: alpha(theme.palette.info.main, 0.05), borderTop: '1px solid', borderColor: alpha(theme.palette.info.main, 0.2), mt: 'auto' })}>
        <Container maxWidth="md">
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'info.dark', mb: 3, fontSize: { xs: '2rem', md: '2.5rem' } }}>هل أنت مستعد للبدء؟</Typography>
          <Typography variant="h6" sx={{ color: 'info.main', mb: 5, lineHeight: 1.8 }}>
            انضم إلى آلاف المستخدمين الذين وجدوا عقارهم المثالي عبر منصتنا اليوم.
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, justifyContent: 'center' }}>
            <Box component={Link} href="/" sx={{ textDecoration: 'none' }}>
              <Button variant="contained" size="large" sx={{ px: 4, py: 1.5 }}>تصفح العقارات المتاحة</Button>
            </Box>
            <Box component={Link} href="/contact" sx={{ textDecoration: 'none' }}>
              <Button variant="outlined" size="large" sx={{ px: 4, py: 1.5, bgcolor: 'background.paper' }}>تواصل مع فريقنا</Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}