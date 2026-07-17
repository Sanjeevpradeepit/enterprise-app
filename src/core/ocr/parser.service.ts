import {
  BusinessCardOCR,
  CandidateOCR,
} from './types';

class ParserService {
  /**
   * Parse Resume
   */
  parseResume(
    text: string,
  ): CandidateOCR {
    const candidate: CandidateOCR = {};

    candidate.email =
      this.extractEmail(text);

    candidate.phone =
      this.extractPhone(text);

    candidate.name =
      this.extractName(text);

    candidate.experience =
      this.extractExperience(text);

    candidate.skills =
      this.extractSkills(text);

    candidate.designation =
      this.extractDesignation(text);

    return candidate;
  }

  /**
   * Parse Business Card
   */
  parseBusinessCard(
    text: string,
  ): BusinessCardOCR {
    return {
      name: this.extractName(text),

      email:
        this.extractEmail(text),

      phone:
        this.extractPhone(text),

      company:
        this.extractCompany(text),

      designation:
        this.extractDesignation(text),
    };
  }

  private extractEmail(
    text: string,
  ): string | undefined {
    const match = text.match(
      /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i,
    );

    return match?.[0];
  }

  private extractPhone(
    text: string,
  ): string | undefined {
    const match = text.match(
      /(\+?\d[\d\s-]{8,}\d)/,
    );

    return match?.[0];
  }

  private extractName(
    text: string,
  ): string | undefined {
    const lines = text
      .split('\n')
      .map(x => x.trim())
      .filter(Boolean);

    return lines[0];
  }

  private extractCompany(
    text: string,
  ): string | undefined {
    const lines = text
      .split('\n')
      .map(x => x.trim())
      .filter(Boolean);

    if (lines.length >= 3) {
      return lines[2];
    }

    return undefined;
  }

  private extractDesignation(
    text: string,
  ): string | undefined {
    const lines = text
      .split('\n')
      .map(x => x.trim())
      .filter(Boolean);

    if (lines.length >= 2) {
      return lines[1];
    }

    return undefined;
  }

  private extractExperience(
    text: string,
  ): string | undefined {
    const match = text.match(
      /(\d+\+?\s*(years?|yrs?))/i,
    );

    return match?.[0];
  }

  private extractSkills(
    text: string,
  ): string[] {
    const knownSkills = [
      'React',
      'React Native',
      'Angular',
      'Vue',
      'Node.js',
      'NestJS',
      'Express',
      'Java',
      'Spring',
      'Kotlin',
      'Swift',
      'Objective-C',
      'Flutter',
      'Dart',
      'TypeScript',
      'JavaScript',
      'Python',
      'Go',
      'Rust',
      'AWS',
      'Azure',
      'Docker',
      'Kubernetes',
      'Redis',
      'RabbitMQ',
      'Kafka',
      'PostgreSQL',
      'MongoDB',
      'MySQL',
      'Prisma',
      'GraphQL',
      'REST',
    ];

    const lower =
      text.toLowerCase();

    return knownSkills.filter(skill =>
      lower.includes(
        skill.toLowerCase(),
      ),
    );
  }
}

export const parserService =
  new ParserService();