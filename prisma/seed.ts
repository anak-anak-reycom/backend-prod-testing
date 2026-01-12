import { PrismaClient, Prisma } from "../src/generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

/* ======================
   Admin Seeder
====================== */
const adminData: Prisma.AdminCreateInput[] = [
  {
    name_admin: "Super Admin",
    email: "admin@company.com",
    password: "password123",
    token: null,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    name_admin: "HR Admin",
    email: "hr@company.com",
    password: "password123",
    token: null,
    created_at: new Date(),
    updated_at: new Date(),
  },
];

/* ======================
   Category + Careers Seeder
====================== */
const categoryData: Prisma.CategoryCreateInput[] = [
  {
    name_category: "IT & Development",
    job_type: "Full Time",
    careers: {
      create: [
        { job_name: "Backend Developer" },
        { job_name: "Frontend Developer" },
      ],
    },
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    name_category: "Marketing",
    job_type: "Contract",
    careers: {
      create: [
        { job_name: "Digital Marketing Specialist" },
      ],
    },
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    name_category: "Design",
    job_type: "Freelance",
    careers: {
      create: [
        { job_name: "UI/UX Designer" },
      ],
    },
    created_at: new Date(),
    updated_at: new Date(),
  },
];

/* ======================
   Applys Seeder
====================== */
const applysData: Prisma.ApplysCreateInput[] = [
  {
    name_apply: "Andi Saputra",
    email: "andi@gmail.com",
    no_hp: "081234567890",
    gender: "Male",
    domicile: "Jakarta",
    resume: "andi_resume.pdf",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    name_apply: "Siti Aisyah",
    email: "siti@gmail.com",
    no_hp: "089876543210",
    gender: "Female",
    domicile: "Bandung",
    resume: "siti_resume.pdf",
    created_at: new Date(),
    updated_at: new Date(),
  },
];

/* ======================
   Contacts Seeder
====================== */
const contactsData: Prisma.ContactsCreateInput[] = [
  {
    branch: "Head Office",
    branch_per_country: "Indonesia - Jakarta",
    country: "Indonesia",
    email: "contact@company.com",
    no_hp: "0211234567",
    address: "Jl. Sudirman No. 1, Jakarta",
    website: "https://company.com",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    branch: "Branch Singapore",
    branch_per_country: "Singapore",
    country: "Singapore",
    email: "contact.sg@company.com",
    no_hp: "+65 1234 5678",
    address: "Orchard Road, Singapore",
    website: "https://company.com/sg",
    created_at: new Date(),
    updated_at: new Date(),
  },
];

/* ======================
   Videos Seeder
====================== */
const videosData: Prisma.VideosCreateInput[] = [
  {
    title_video: "Company Profile 2025",
    link_video: "https://youtube.com/watch?v=companyprofile",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    title_video: "Office Tour",
    link_video: "https://youtube.com/watch?v=officetour",
    created_at: new Date(),
    updated_at: new Date(),
  },
];


/* ======================
   News + Carousel Seeder
====================== */
const newsData: Prisma.NewsCreateInput[] = [
  {
    title: "Grand Opening Office Baru",
    image_news: "https://cdn.company.com/news/office.jpg",
    image_news_public_id: "news-office-1",
    content: "Kami resmi membuka kantor baru di Jakarta Selatan.",
    createdAt: new Date(),
    updatedAt: new Date(),
    carousels: {
      create: [
        {
          image_url: "https://cdn.company.com/news/carousel1.jpg",
          public_id: "carousel-1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          image_url: "https://cdn.company.com/news/carousel2.jpg",
          public_id: "carousel-2",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    },
  },
  {
    title: "Employee Gathering 2025",
    image_news: "https://cdn.company.com/news/gathering.jpg",
    image_news_public_id: "news-gathering-1",
    content: "Kegiatan gathering tahunan untuk seluruh karyawan.",
    createdAt: new Date(),
    updatedAt: new Date(),
    carousels: {
      create: [
        {
          image_url: "https://cdn.company.com/news/gathering1.jpg",
          public_id: "gathering-1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    },
  },
];


/* ======================
   Main Seeder Function
====================== */
export async function main() {
  console.log("🌱 Seeding database...");

  for (const admin of adminData) {
    await prisma.admin.create({ data: admin });
  }

  for (const category of categoryData) {
    await prisma.category.create({ data: category });
  }

  for (const apply of applysData) {
    await prisma.applys.create({ data: apply });
  }

  for (const contact of contactsData) {
    await prisma.contacts.create({ data: contact });
  }

    for (const video of videosData) {
    await prisma.videos.create({ data: video });
  }

  for (const news of newsData) {
    await prisma.news.create({ data: news });
  }


  console.log("✅ Seeding selesai");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
